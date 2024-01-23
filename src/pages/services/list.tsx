import React from "react";
import { useDataGrid, ShowButton, List, DateField } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IResourceComponentsProps } from "@refinedev/core";

export const ServiceList: React.FC<IResourceComponentsProps> = () => {
  const { dataGridProps } = useDataGrid();

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "name",
        flex: 1,
        headerName: "Name",
        minWidth: 200,
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
        field: "currency",
        flex: 1,
        headerName: "Currency",
        minWidth: 200,
      },
      {
        field: "status",
        flex: 1,
        headerName: "Status",
        minWidth: 200,
      },
      {
        field: "avgRating",
        flex: 1,
        headerName: "Avg Rating",
        type: "number",
        minWidth: 200,
      },
      {
        field: "ratingCount",
        flex: 1,
        headerName: "Rating Count",
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
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
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
        getRowId={(row) => row?._id}
        columns={columns}
        autoHeight
      />
    </List>
  );
};
