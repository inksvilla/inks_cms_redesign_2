import React from "react";
import { useDataGrid, List, DateField, ShowButton } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IResourceComponentsProps } from "@refinedev/core";
import { getAppointmentStatusColor, setColumnFilters } from "../../utils/table";
import { FILTER_DEBOUNCE_MS } from "../../constants";
import { Typography } from "@mui/material";

export const AppointmentList: React.FC<IResourceComponentsProps> = () => {
  const { dataGridProps } = useDataGrid({ resource: "appointment/admin" });

  let columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "user",
        flex: 1,
        headerName: "Customer",
        valueGetter: ({ row }) => {
          const value = row?.user?.name;
          return value;
        },
        minWidth: 300,
      },
      {
        field: "merchant",
        flex: 1,
        headerName: "Merchant",
        valueGetter: ({ row }) => {
          const value = row?.service?.user?.name;
          return value;
        },
        minWidth: 300,
      },
      {
        field: "service",
        flex: 1,
        headerName: "Service",
        valueGetter: ({ row }) => {
          const value = row?.service?.name;

          return value;
        },
        minWidth: 300,
      },
      {
        field: "date",
        flex: 1,
        headerName: "Date",
        minWidth: 250,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
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
              color={getAppointmentStatusColor(value)}
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
  columns = setColumnFilters(columns);

  return (
    <List>
      <DataGrid
        {...dataGridProps}
        getRowId={(row) => row._id}
        filterDebounceMs={FILTER_DEBOUNCE_MS}
        columns={columns}
        autoHeight
      />
    </List>
  );
};
