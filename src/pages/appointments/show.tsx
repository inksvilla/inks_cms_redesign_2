import { useShow, IResourceComponentsProps } from "@refinedev/core";
import {
  Show,
  TextFieldComponent as TextField,
  DateField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const AppointmentShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          Customer
        </Typography>
        <TextField value={record?.user?.name} mb={2} />

        <Typography variant="body1" fontWeight="bold">
          Merchant
        </Typography>
        <TextField value={record?.service?.user.name} mb={2} />

        <Typography variant="body1" fontWeight="bold">
          Service
        </Typography>
        <TextField value={record?.service?.name} mb={2} />

        <Typography variant="body1" fontWeight="bold">
          Booked Date
        </Typography>
        <DateField value={record?.date} mb={2} />

        <Typography variant="body1" fontWeight="bold">
          Customer Booking Name
        </Typography>
        <TextField value={record?.customerInfo?.name} mb={2} />

        <Typography variant="body1" fontWeight="bold">
          Customer PhoneNumber
        </Typography>
        <TextField value={record?.customerInfo?.phoneNumber} mb={2} />

        <Typography variant="body1" fontWeight="bold">
          Customer Expectation
        </Typography>
        <TextField value={record?.customerInfo?.expectation} mb={2} />

        <Typography variant="body1" fontWeight="bold">
          Payment method
        </Typography>
        <TextField
          textTransform={"capitalize"}
          value={record?.payment?.paymentMethod}
          mb={2}
        />

        <Typography variant="body1" fontWeight="bold">
          Payment Status
        </Typography>
        <TextField
          textTransform={"capitalize"}
          value={record?.payment?.paymentStatus}
          mb={2}
        />

        <Typography variant="body1" fontWeight="bold">
          Status
        </Typography>
        <TextField textTransform={"capitalize"} value={record?.status} mb={2} />

        <Typography variant="body1" fontWeight="bold">
          Created At
        </Typography>
        <DateField value={record?.createdAt} mb={2} />

        <Typography variant="body1" fontWeight="bold">
          Updated At
        </Typography>
        <DateField value={record?.updatedAt} mb={2} />
      </Stack>
    </Show>
  );
};
