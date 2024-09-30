import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import "./DataTable.element.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";
import { Filter, fuzzyFilter } from "./common/Filter";
import { DebouncedInput } from "./common/DebouncedInput";

export function DataTable({ id, data, columns, onRowClick, contextMenu, setContextMenu }) {
  const [globalFilter, setGlobalFilter] = useState("");

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const table = useReactTable({
    columns,
    data,
    debugTable: false,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "fuzzy",
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
      globalFilter,
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
  });

  return (
    <>
      <div className="p-2">
        <div>
          <DebouncedInput value={globalFilter ?? ""} onChange={(value) => setGlobalFilter(String(value))} placeholder="Search all columns..." />
        </div>
        <div className="flex align-middle items-center justify-between p-5">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              Go to page:
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="border p-1 rounded w-16"
              />
            </span>
          </div>

          <div className="flex items-center gap-2 ">
            <button className=" rounded p-1" onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()}>
              <FontAwesomeIcon icon="fa-solid fa-angles-left" />
            </button>
            <button className=" rounded p-1" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              <FontAwesomeIcon icon="fa-solid fa-angle-left" />
            </button>
            <button className=" rounded p-1" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              <FontAwesomeIcon icon="fa-solid fa-angle-right" />
            </button>
            <button className=" rounded p-1" onClick={() => table.lastPage()} disabled={!table.getCanNextPage()}>
              <FontAwesomeIcon icon="fa-solid fa-angles-right" />
            </button>
            <span className="flex items-center gap-1">
              <strong>
                {table.getState().pagination.pageIndex + 1} of {table.getPageCount().toLocaleString()}
              </strong>
            </span>
          </div>
          <div className="flex items-center gap-2 ">
            <select
              className=" p-1 border "
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 ">
            Showing {table.getRowModel().rows.length.toLocaleString()} of {table.getRowCount().toLocaleString()} Rows
          </div>
        </div>
        <div className="overflow-y-auto rounded-lg border shadow">
          <table className="w-full  " id={id}>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => {
                    return (
                      <th key={header.id} colSpan={header.colSpan}>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "text-center  text-white cursor-pointer select-none"
                              : "text-center text-white border-r px-2 border-white",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: <FontAwesomeIcon className="ml-2" icon="fa-solid fa-chevron-up" />,
                            desc: <FontAwesomeIcon className="ml-2" icon="fa-solid fa-chevron-down" />,
                          }[header.column.getIsSorted()] ?? null}
                          {header.column.getCanFilter() ? (
                            <div>
                              <Filter column={header.column} index={index} table={table} headerGroup={headerGroup} />
                            </div>
                          ) : null}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr
                    key={row.id}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      if (onRowClick) onRowClick(row.index);
                      if (row.original.id === contextMenu.id)
                        setContextMenu((state) => ({
                          ...state,
                          id: row.original.id,
                          isOpen: !state.isOpen,
                        }));
                      else if (row.original.id !== contextMenu.id)
                        setContextMenu((state) => ({
                          ...state,
                          id: row.original.id,
                          isOpen: true,
                        }));
                      else
                        setContextMenu((state) => ({
                          ...state,
                          isOpen: !state.isOpen,
                        }));
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      if (onRowClick) onRowClick(row.index);
                      if (row.original.id === contextMenu.id)
                        setContextMenu((state) => ({
                          ...state,
                          id: row.original.id,
                          isOpen: !state.isOpen,
                        }));
                      else if (row.original.id !== contextMenu.id)
                        setContextMenu((state) => ({
                          ...state,
                          id: row.original.id,
                          isOpen: true,
                        }));
                      else
                        setContextMenu((state) => ({
                          ...state,
                          isOpen: !state.isOpen,
                        }));
                    }}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id} className="text-left">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex align-middle items-center justify-between  p-5">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              Go to page:
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="border p-1 rounded w-16"
              />
            </span>
          </div>

          <div className="flex items-center gap-2 ">
            <button className=" rounded p-1" onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()}>
              <FontAwesomeIcon icon="fa-solid fa-angles-left" />
            </button>
            <button className=" rounded p-1" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              <FontAwesomeIcon icon="fa-solid fa-angle-left" />
            </button>
            <button className=" rounded p-1" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              <FontAwesomeIcon icon="fa-solid fa-angle-right" />
            </button>
            <button className=" rounded p-1" onClick={() => table.lastPage()} disabled={!table.getCanNextPage()}>
              <FontAwesomeIcon icon="fa-solid fa-angles-right" />
            </button>
            <span className="flex items-center gap-1">
              <strong>
                {table.getState().pagination.pageIndex + 1} of {table.getPageCount().toLocaleString()}
              </strong>
            </span>
          </div>
          <div className="flex items-center gap-2 ">
            <select
              className=" p-1 border"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 ">
            Showing {table.getRowModel().rows.length.toLocaleString()} of {table.getRowCount().toLocaleString()} Rows
          </div>
        </div>
      </div>
    </>
  );
}
