import { useShow, IResourceComponentsProps } from "@refinedev/core";
import {
  Show,
  TextFieldComponent as TextField,
  DateField,
} from "@refinedev/mui";
import ReactJson from "react-json-view";
import { Typography, Stack, Link } from "@mui/material";

export const PaymentShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          Type
        </Typography>
        <Link href={`/${record?.type}s/show/${record?.item}`}>
          <TextField textTransform={"capitalize"} value={record?.type} mb={2} />
        </Link>
        <Typography variant="body1" fontWeight="bold">
          Customer
        </Typography>
        <Link href={`/users/show/${record?.user?._id}`}>
          <TextField
            textTransform={"capitalize"}
            value={record?.user?.name}
            mb={2}
          />
        </Link>
        <Typography variant="body1" fontWeight="bold">
          Merchant
        </Typography>
        <Link href={`/users/show/${record?.merchant?._id}`}>
          <TextField
            textTransform={"capitalize"}
            value={record?.merchant?.name}
            mb={2}
          />
        </Link>
        <Typography variant="body1" fontWeight="bold">
          Payment Method
        </Typography>
        <TextField
          textTransform="capitalize"
          value={record?.paymentMethod}
          mb={2}
        />
        <Typography variant="body1" fontWeight="bold">
          Payment Status
        </Typography>
        <TextField
          textTransform="capitalize"
          value={record?.paymentStatus}
          mb={2}
        />
        <Typography variant="body1" fontWeight="bold">
          Created At
        </Typography>
        <DateField value={record?.createdAt} mb={2} />
        <Typography variant="body1" fontWeight="bold">
          Updated At
        </Typography>
        <DateField value={record?.updatedAt} mb={2} />

        <Typography variant="body1" fontWeight="bold">
          Payment Details
        </Typography>
        <ReactJson src={record?.details} />
      </Stack>
    </Show>
  );
};
