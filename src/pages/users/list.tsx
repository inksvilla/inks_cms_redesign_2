import React from "react";
import {
  useDataGrid,
  EditButton,
  List,
  DateField,
  EmailField,
  ShowButton,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IResourceComponentsProps } from "@refinedev/core";
import { FILTER_DEBOUNCE_MS } from "../../constants";
import { getUserStatusColor, setColumnFilters } from "../../utils/table";
import { Typography } from "@mui/material";

export const UserList: React.FC<IResourceComponentsProps> = () => {
  const { dataGridProps } = useDataGrid({
    pagination: { mode: "server" },
    resource: "users",
  });

  let columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "name",
        flex: 1,
        headerName: "Name",
        minWidth: 200,
      },
      {
        field: "username",
        flex: 1,
        headerName: "Username",
        minWidth: 200,
        valueGetter: (params) => params.row.user?.username || "-",
      },
      {
        field: "email",
        flex: 1,
        headerName: "Email",
        minWidth: 250,
        renderCell: function render({ value }) {
          return <EmailField value={value} />;
        },
      },
      {
        field: "role",
        flex: 1,
        headerName: "Role",
        minWidth: 200,
      },
      {
        field: "phoneNumber",
        flex: 1,
        headerName: "Phone Number",
        minWidth: 200,
      },
      {
        field: "numFollowers",
        flex: 1,
        headerName: "Followers",
        type: "number",
        minWidth: 100,
      },
      {
        field: "numFollowings",
        flex: 1,
        headerName: "Followings",
        type: "number",
        minWidth: 100,
      },
      {
        field: "status",
        flex: 1,
        headerName: "Status",
        minWidth: 150,
        renderCell: function render({ value }) {
          return (
            <Typography
              fontSize={14}
              fontWeight={"medium"}
              color={getUserStatusColor(value)}
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
        field: "numReviews",
        flex: 1,
        headerName: "Reviews",
        type: "number",
        minWidth: 100,
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
        getRowId={(row) => row._id}
        columns={columns}
        filterDebounceMs={FILTER_DEBOUNCE_MS}
        autoHeight
      />
    </List>
  );
};
