import React from "react";
import { useDataGrid, List, DateField, ShowButton } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IResourceComponentsProps } from "@refinedev/core";
import { getPaymentStatusColor, setColumnFilters } from "../../utils/table";
import { FILTER_DEBOUNCE_MS } from "../../constants";
import { Link, Typography } from "@mui/material";

export const PaymentList: React.FC<IResourceComponentsProps> = () => {
  const { dataGridProps } = useDataGrid({ resource: "payment/admin" });

  let columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "type",
        flex: 1,
        headerName: "Type",
        minWidth: 200,
        renderCell: function render({ row, value }) {
          return (
            <Link href={`/${value}s/show/${row.item}`}>
              {value[0].toUpperCase() + value.slice(1)}
            </Link>
          );
        },
      },
      {
        field: "user",
        flex: 1,
        headerName: "Customer",
        minWidth: 300,
        valueGetter: ({ row }) => row?.user?.name,
        renderCell: function render({ value, row }) {
          return <Link href={`/users/show/${row.user?._id}`}>{value}</Link>;
        },
      },
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
          return (
            <Link href={`/users/show/${row?.merchant?._id}`}>{value}</Link>
          );
        },
      },
      {
        field: "paymentMethod",
        flex: 1,
        headerName: "Payment Method",
        minWidth: 200,
      },
      {
        field: "paymentStatus",
        flex: 1,
        headerName: "Payment Status",
        minWidth: 200,
        renderCell: function render({ value }) {
          return (
            <Typography
              fontSize={14}
              fontWeight={"medium"}
              color={getPaymentStatusColor(value)}
            >
              {value[0].toUpperCase() + value.slice(1)}
            </Typography>
          );
        },
      },
      {
        field: "createdAt",
        flex: 1,
        headerName: "Created At",
        minWidth: 150,
        type: "date",
        valueGetter: ({ row }) => {
          return new Date(row.createdAt);
        },
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "updatedAt",
        flex: 1,
        headerName: "Updated At",
        minWidth: 150,
        type: "date",
        valueGetter: ({ row }) => {
          return new Date(row.updatedAt);
        },
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: function render({ row }) {
          return <ShowButton hideText recordItemId={row._id} />;
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
    <List>
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
