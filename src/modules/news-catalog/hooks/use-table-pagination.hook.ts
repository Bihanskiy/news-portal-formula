import React, { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";

type TablePaginationProps = {
  defaultRowsPerPage: number[];
  request: (arg: any) => Promise<void>;
}

export const useTablePagination = ({
  defaultRowsPerPage,
  request
}: TablePaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage[0]);

  useEffect(() => {
    const initialFetch = async () => {
      const pageSize = searchParams.get("pageSize");
      const pageNum = searchParams.get("page");

      const pageSizeChecker = pageSize && defaultRowsPerPage.includes(+pageSize);
      const pageNumChecker = Boolean(pageNum);

      if (pageSizeChecker) setRowsPerPage(+pageSize);
      if (pageNumChecker) setPage(+(pageNum as string));

      await request({ pageSize: pageSizeChecker ? pageSize : rowsPerPage, page: pageNumChecker ? +(pageNum as string) + 1 : page + 1 });
    }

    initialFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChangePage = async (event: unknown, newPage: number) => {
    setPage(newPage);
    setSearchParams({ pageSize: String(rowsPerPage), page: String(newPage) });
    await request({ pageSize: rowsPerPage, page: newPage + 1 });
  };

  const handleChangeRowsPerPage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const pageSize = event.target.value;
    const pagination = { pageSize };

    setRowsPerPage(+pageSize);
    setPage(0);
    setSearchParams(pagination);
    await request(pagination);
  };

  return {
    page,
    setPage,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    setSearchParams
  }
}

