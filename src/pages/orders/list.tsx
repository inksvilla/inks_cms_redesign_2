import React from "react";
import {
  useDataGrid,
  // EditButton,
  // ShowButton,
  List,
  DateField,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IResourceComponentsProps } from "@refinedev/core";
import { Typography } from "@mui/material";
import { getOrderStatusColor, setColumnFilters } from "../../utils/table";
import { FILTER_DEBOUNCE_MS } from "../../constants";

export const OrderList: React.FC<IResourceComponentsProps> = () => {
  const { dataGridProps } = useDataGrid({ resource: "order/admin" });

  let columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "user",
        flex: 1,
        headerName: "Customer",
        minWidth: 300,
        valueGetter: ({ row }) => row?.user?.name,
      },
      {
        field: "merchant",
        flex: 1,
        headerName: "Merchant",
        minWidth: 300,
        valueGetter: ({ row }) => row?.merchant?.name,
      },
      {
        field: "orderStatus",
        flex: 1,
        headerName: "Status",
        minWidth: 150,
        renderCell: function render({ value }) {
          return (
            <Typography
              fontSize={14}
              fontWeight={"medium"}
              color={getOrderStatusColor(value)}
            >
              {value[0].toUpperCase() + value.slice(1)}
            </Typography>
          );
        },
      },
      {
        field: "totalPrice",
        flex: 1,
        headerName: "Total Price",
        type: "number",
        minWidth: 100,
      },
      {
        field: "address",
        flex: 1,
        headerName: "Address",
        minWidth: 200,
      },
      {
        field: "nearestLandmark",
        flex: 1,
        headerName: "Nearest Landmark",
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
      // {
      //   field: "actions",
      //   headerName: "Actions",
      //   sortable: false,
      //   renderCell: function render({ row }) {
      //     return (
      //       <>
      //         <EditButton hideText recordItemId={row.id} />
      //         {/* <ShowButton hideText recordItemId={row.id} /> */}
      //       </>
      //     );
      //   },
      //   align: "center",
      //   headerAlign: "center",
      //   minWidth: 80,
      // },
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
