import React, { useState } from 'react';
import { Box, Typography, TextField, InputAdornment, FormControl, FormHelperText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import SearchIcon from '@mui/icons-material/Search';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { AppButton } from '../../ui/app-button';

import './news-catalog.styles.scss';
import { SelectBlock } from './components/select-block';
import { filtersConfig } from './config';

import clsx from 'clsx';
import { useRequest } from '../../hooks/use-request.hook';
import { getArticles } from '../../requests/articles';
import { NewsTable } from './components/news-table';

import { useTablePagination } from './hooks/use-table-pagination.hook';

import { IArticle } from "../../models/article.model";

const defaultRowsPerPage = [5, 10, 25];

type FiltersType = {
  country: string,
  category: string,
  search: string
}

type NewsCatalogProps = {
  title?: string;
}

const NewsCatalog = ({
  title
}: NewsCatalogProps): JSX.Element => {
  const navigate = useNavigate();

  const [isOpenFilters, setIsOpenFilters] = useState<boolean>(false);
  const [timer, setTimer] = useState<any>(null);

  const [filters, setFilters] = useState<FiltersType>({
    country: "ua",
    category: "",
    search: ""
  });

  const {
    error: articlesError,
    data: articlesData,
    request: requestArticles,
  } = useRequest(getArticles);

  const {
    page,
    setPage,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    setSearchParams
  } = useTablePagination({
    defaultRowsPerPage,
    request: (arg) => requestArticles({ ...filters, ...arg })
  })

  const onRowClickHandle = ({
    author,
    content,
    description,
    publishedAt,
    title,
    urlToImage,
    source
  }: Omit<IArticle, "source" | "url"> & {
    content?: string;
    source?: string;
  }) => {
    navigate('/article', {
      state: {
        author, content, description, publishedAt, title, urlToImage, source
      }
    });
  }

  const handleChangeFilters = (value: { [key: string]: string }) => {
    setFilters(prev => ({ ...prev, ...value }))
  }

  const onSearchHandle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    handleChangeFilters({ search: newValue });
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(async () => {
        if (rowsPerPage !== 5) {
          setSearchParams({ pageSize: String(rowsPerPage) });
          setPage(0);
        };
        await requestArticles({ ...filters, pageSize: rowsPerPage, search: newValue });
      }, 500)
    )
  }

  const onChangeSelect = async (value: string, parameter: string) => {
    handleChangeFilters({ [parameter]: value });
    if (rowsPerPage !== 5) {
      setSearchParams({ pageSize: String(rowsPerPage) });
      setPage(0);
    };
    await requestArticles({ ...filters, pageSize: rowsPerPage, [parameter]: value });
  }

  const onToggleOpenFilters = async () => {
    setIsOpenFilters(prev => !prev)
  }

  return (
    <Box className="news-table">
      <Box className="table-header">
        <Typography variant='h4' component="h2" className="table-header__title">{title}</Typography>
        <Box
          className="table-filters"
          component="form"
          noValidate
          autoComplete="off"
        >
          <TextField
            value={filters.search}
            onChange={onSearchHandle}
            type="text"
            variant="outlined"
            size="small"
            placeholder="Search article"
            InputProps={{
              startAdornment:
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>,
            }}
          />
          <AppButton
            variant="contained"
            color="secondary"
            startIcon={<FilterAltOutlinedIcon fontSize="small" />}
            onClick={onToggleOpenFilters}
          >
            Filters
          </AppButton>
        </Box>
      </Box>
      <Box
        className={clsx({
          "filters-wrapper": true,
          "filters-hide": !isOpenFilters,
        })}
      >
        {filtersConfig?.map(filter => {
          return (
            <FormControl
              key={filter.id}
              fullWidth
              className="filter-block"
            >
              <FormHelperText sx={{ marginLeft: 0, color: "#1A232E" }}>
                {filter.label}
              </FormHelperText>
              <SelectBlock
                parameter={filter.id}
                options={filter.options}
                value={(filters as { [key: string]: string })[filter.id]}
                onChange={onChangeSelect}
              />
            </FormControl>
          )
        })}
      </Box>
      {articlesError &&
        <Typography color="error">
          {articlesError.message}
        </Typography>
      }
      <NewsTable
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        articlesData={articlesData?.data.articles}
        articlesCount={articlesData?.data.totalResults}
        onRowClick={onRowClickHandle}
      />
    </Box>
  )
}

export default NewsCatalog;