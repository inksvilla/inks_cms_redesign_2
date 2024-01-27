import React from "react";
import {
  useDataGrid,
  List,
  DateField,
  EditButton,
  ShowButton,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IResourceComponentsProps } from "@refinedev/core";
import { Typography } from "@mui/material";
import { FILTER_DEBOUNCE_MS, ProductStatus } from "../../constants";
import { setColumnFilters } from "../../utils/table";

export const ProductList: React.FC<IResourceComponentsProps> = () => {
  const { dataGridProps } = useDataGrid();

  let columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "name",
        flex: 1,
        headerName: "Name",
        minWidth: 400,
      },
      {
        field: "user",
        flex: 1,
        headerName: "User",
        valueGetter: ({ row }) => {
          const value = row?.user?.name;

          return value;
        },
        minWidth: 200,
      },
      {
        field: "status",
        flex: 1,
        headerName: "Status",
        minWidth: 100,
        renderCell: function render({ value }) {
          return (
            <Typography
              fontSize={14}
              fontWeight="bold"
              color={value === ProductStatus.Active ? "green" : "red"}
            >
              {value[0].toUpperCase() + value.slice(1)}
            </Typography>
          );
        },
      },
      {
        field: "currency",
        flex: 1,
        headerName: "Currency",
        minWidth: 100,
      },
      {
        field: "avgRating",
        flex: 1,
        headerName: "Avg Rating",
        type: "number",
        minWidth: 100,
      },
      {
        field: "totalRating",
        flex: 1,
        headerName: "Total Ratings",
        type: "number",
        minWidth: 100,
      },
      {
        field: "createdAt",
        flex: 1,
        headerName: "Created At",
        minWidth: 200,
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
        minWidth: 200,
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
          return (
            <>
              <EditButton hideText recordItemId={row._id} />
              <ShowButton hideText recordItemId={row._id} />
            </>
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
    <List>
      <DataGrid
        {...dataGridProps}
        getRowId={(row) => row?._id}
        columns={columns}
        filterDebounceMs={FILTER_DEBOUNCE_MS}
        autoHeight
      />
    </List>
  );
};
