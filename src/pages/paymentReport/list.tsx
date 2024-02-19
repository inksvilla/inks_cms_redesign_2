import React from "react";
import { useDataGrid, List, DateField, ShowButton } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IResourceComponentsProps } from "@refinedev/core";
import { Link } from "@mui/material";
import { setColumnFilters } from "../../utils/table";
import { FILTER_DEBOUNCE_MS } from "../../constants";
import { useNavigate } from "react-router-dom";

export const PaymentReportList: React.FC<IResourceComponentsProps> = () => {
  const { dataGridProps } = useDataGrid({
    resource: "paymentReport/merchant",
  });

  const navigate = useNavigate();

  let columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "merchant",
        flex: 1,
        headerName: "Merchant",
        sortable: false,
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
        filterable: false,
        sortable: false,
        headerName: "Debit",
        type: "number",
        valueGetter: ({ row }) => row?.debit || "-",
        minWidth: 200,
      },
      {
        field: "credit",
        flex: 1,
        filterable: false,
        sortable: false,
        headerName: "Credit",
        type: "number",
        valueGetter: ({ row }) => row?.credit || "-",
        minWidth: 200,
      },
      {
        field: "balance",
        flex: 1,
        filterable: false,
        sortable: false,
        headerName: "Balance",
        type: "number",
        minWidth: 200,
      },
      {
        field: "paymentReference",
        flex: 1,
        filterable: false,
        sortable: false,
        headerName: "Payment Reference",
        minWidth: 200,
      },
      {
        field: "createdAt",
        flex: 1,
        filterable: false,
        sortable: false,
        headerName: "Created At",
        minWidth: 250,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "updatedAt",
        flex: 1,
        filterable: false,
        sortable: false,
        headerName: "Updated At",
        minWidth: 250,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <ShowButton
              hideText
              onClick={() => {
                navigate({
                  pathname: `/paymentReports/show/${row?.merchant?._id}`,
                  search: `?merchantName=${row?.merchant?.name}`,
                });
              }}
            />
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    []
  );

  columns = setColumnFilters(columns);

  return (
    <List canCreate={false}>
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
