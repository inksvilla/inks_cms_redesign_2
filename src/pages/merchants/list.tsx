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

export const MerchantList: React.FC<IResourceComponentsProps> = () => {
  const { dataGridProps } = useDataGrid({
    pagination: { mode: "server" },
    resource: "users/merchant",
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "name",
        flex: 1,
        headerName: "Name",
        minWidth: 200,
        valueGetter: (params) => params.row.user?.name,
      },
      {
        field: "username",
        flex: 1,
        headerName: "Username",
        minWidth: 200,
        valueGetter: (params) => params.row.user?.username,
      },
      {
        field: "country",
        flex: 1,
        headerName: "Country",
        minWidth: 200,
      },
      {
        field: "companyName",
        flex: 1,
        headerName: "Company",
        minWidth: 200,
      },
      {
        field: "email",
        flex: 1,
        headerName: "Email",
        minWidth: 250,
        valueGetter: (params) => params.row.user?.email,
        renderCell: function render({ value }) {
          return <EmailField value={value} />;
        },
      },
      {
        field: "phoneNumber",
        flex: 1,
        headerName: "Phone Number",
        minWidth: 200,
        valueGetter: (params) => params.row.user?.phoneNumber,
      },
      {
        field: "numFollowers",
        flex: 1,
        headerName: "Followers",
        type: "number",
        minWidth: 100,
        valueGetter: (params) => params.row.user?.numFollowers,
      },
      {
        field: "numFollowings",
        flex: 1,
        headerName: "Followings",
        type: "number",
        minWidth: 100,
        valueGetter: (params) => params.row.user?.numFollowings,
      },
      {
        field: "numReviews",
        flex: 1,
        headerName: "Reviews",
        type: "number",
        minWidth: 100,
        valueGetter: (params) => params.row.user?.numReviews,
      },
      {
        field: "status",
        flex: 1,
        headerName: "Status",
        minWidth: 100,
        valueGetter: (params) => params.row.user?.status,
      },
      {
        field: "createdAt",
        flex: 1,
        headerName: "Created At",
        minWidth: 150,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
        valueGetter: (params) => params.row.user?.createdAt,
      },
      {
        field: "updatedAt",
        flex: 1,
        headerName: "Updated At",
        minWidth: 150,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
        valueGetter: (params) => params.row.user?.updatedAt,
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

  return (
    <List>
      <DataGrid
        {...dataGridProps}
        getRowId={(row) => row._id}
        columns={columns}
        autoHeight
      />
    </List>
  );
};
