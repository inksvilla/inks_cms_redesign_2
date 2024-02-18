import React from "react";
import { useDataGrid, List, DateField } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IResourceComponentsProps } from "@refinedev/core";
import { Link } from "@mui/material";
import { setColumnFilters } from "../../utils/table";
import { FILTER_DEBOUNCE_MS } from "../../constants";

export const PaymentReportList: React.FC<IResourceComponentsProps> = () => {
  const { dataGridProps } = useDataGrid();

  let columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "merchant",
        flex: 1,
        headerName: "Merchant",
        minWidth: 300,
        valueGetter: ({ row }) => {
          const value = row?.merchant?.name;
          return value;
        },
        renderCell: function render({ value, row }) {
          return <Link href={`/users/show/${row.merchant?._id}`}>{value}</Link>;
        },
      },
      {
        field: "debit",
        flex: 1,
        headerName: "Debit",
        type: "number",
        valueGetter: ({ row }) => row?.debit || "-",
        minWidth: 200,
      },
      {
        field: "credit",
        flex: 1,
        headerName: "Credit",
        type: "number",
        valueGetter: ({ row }) => row?.credit || "-",
        minWidth: 200,
      },
      {
        field: "balance",
        flex: 1,
        headerName: "Balance",
        type: "number",
        minWidth: 200,
      },
      {
        field: "createdAt",
        flex: 1,
        headerName: "Created At",
        minWidth: 250,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "updatedAt",
        flex: 1,
        headerName: "Updated At",
        minWidth: 250,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
    ],
    []
  );

  columns = setColumnFilters(columns);

  return (
    <List canCreate>
      <DataGrid
        {...dataGridProps}
        getRowId={(row) => row?._id}
        filterDebounceMs={FILTER_DEBOUNCE_MS}
        columns={columns}
        autoHeight
      />
    </List>
  );
};
