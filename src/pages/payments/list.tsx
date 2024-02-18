import React from "react";
import { useDataGrid, List, DateField } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IResourceComponentsProps } from "@refinedev/core";
import { setColumnFilters } from "../../utils/table";
import { FILTER_DEBOUNCE_MS } from "../../constants";

export const PaymentList: React.FC<IResourceComponentsProps> = () => {
  const { dataGridProps } = useDataGrid({ resource: "payment/admin" });

  let columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "type",
        flex: 1,
        headerName: "Type",
        minWidth: 200,
      },
      {
        field: "user",
        flex: 1,
        headerName: "User",
        minWidth: 300,
        valueGetter: ({ row }) => {
          const value = row?.user?.name;
          return value;
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
