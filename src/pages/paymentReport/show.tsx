import React from "react";
import { useDataGrid, List, DateField } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IResourceComponentsProps } from "@refinedev/core";
import { Link } from "@mui/material";
import { setColumnFilters } from "../../utils/table";
import { FILTER_DEBOUNCE_MS } from "../../constants";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const PaymentReportShow: React.FC<IResourceComponentsProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const merchantName = searchParams.get("merchantName");

  const { dataGridProps } = useDataGrid({
    filters: {
      permanent: [{ field: "merchant", operator: "eq", value: id }],
    },
  });

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
        field: "paymentReference",
        flex: 1,
        headerName: "Payment Reference",
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
    <List
      title="Payment Report History"
      canCreate
      createButtonProps={{
        onClick: () => {
          navigate({
            pathname: `/paymentReports/create`,
            search: `?merchantId=${id}&merchantName=${merchantName}`,
          });
        },
      }}
    >
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
