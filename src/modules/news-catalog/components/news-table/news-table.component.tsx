import React from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import LinkIcon from '@mui/icons-material/Link';

import './news-table.styles.scss';

import { IArticle } from "../../../../models/article.model";
import { getLocalDayMonthYear } from '../../../../utils/user-friendly-date.utils';

interface Column {
  id: 'urlToImage' | 'title' | 'author' | 'description' | 'publishedAt' | 'url';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: 'urlToImage', label: 'Image', minWidth: 135 },
  { id: 'title', label: 'Title', minWidth: 255 },
  {
    id: 'author',
    label: 'Authors',
    minWidth: 100,
  },
  {
    id: 'description',
    label: 'Description',
    minWidth: 325,
  },
  {
    id: 'publishedAt',
    label: 'Publication date',
    minWidth: 145,
    format: (value: string) => getLocalDayMonthYear(value),
  },
  {
    id: 'url',
    label: 'Original URL',
    minWidth: 120,
  },
];

type NewsTableProps = {
  page: number;
  rowsPerPage: number;
  handleChangePage: (event: unknown, newPage: number) => Promise<void>;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  articlesData?: IArticle[];
  articlesCount?: number;
  onRowClick: (args: Omit<IArticle, "source" | "url"> & {
    content?: string;
    source?: string;
  }) => void;
}

const NewsTable = ({
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  articlesData,
  articlesCount,
  onRowClick
}: NewsTableProps): JSX.Element => {
  console.log(articlesData);

  return (
    <Paper className="table-wrapper" >
      <TableContainer className="container" >
        <Table stickyHeader aria-label="sticky table" className="table">
          <TableHead className="table-head">
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <Typography>
                    {column.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className="table-body">
            {articlesData
              ?.map((article, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={`${article.title}-${index}`}
                    onClick={() => onRowClick({
                      author: article.author,
                      content: article.content,
                      description: article.description,
                      publishedAt: article.publishedAt,
                      title: article.title,
                      urlToImage: article.urlToImage,
                      source: article.source.name,
                    })}
                  >
                    {columns.map((column) => {
                      const value = article[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "urlToImage" ?
                            value ?
                              <img
                                className="table-image"
                                src={value}
                                alt={article.title}
                              />
                              :
                              <Skeleton variant="rectangular" width={100} height={70} />
                            :
                            null
                          }
                          {column.id === "url" ?
                            value ?
                              <a href={value} target="_blank" rel="noreferrer" className="table-link">
                                <LinkIcon
                                  fontSize="small"
                                />
                              </a>
                              :
                              <Typography variant="body1" sx={{ color: "#878B90" }}>None</Typography>
                            :
                            null
                          }
                          {column.id !== "urlToImage" && column.id !== "url" ?
                            value ?
                              <>
                                {
                                  column.format
                                    ?
                                    <Typography className="table-text">{column.format(value)}</Typography>
                                    :
                                    <Typography className="table-text">{value}</Typography>
                                }
                              </>
                              :
                              <Typography variant="body1" sx={{ color: "#878B90" }}>None</Typography>
                            :
                            null
                          }
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={articlesCount ?? 100}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper >
  );
}

export default NewsTable;