import { useShow, IResourceComponentsProps } from "@refinedev/core";
import {
  Show,
  TextFieldComponent as TextField,
  NumberField,
  DateField,
} from "@refinedev/mui";
import { Typography, Stack, Link, Box } from "@mui/material";

export const OrderShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          Customer
        </Typography>
        <Link href={`/users/show/${record?.user?._id}`}>
          <TextField value={record?.user?.name} mb={2} />
        </Link>

        <Typography variant="body1" fontWeight="bold">
          Merchant
        </Typography>
        <Link href={`/users/show/${record?.merchant?._id}`}>
          <TextField value={record?.merchant?.name} mb={2} />
        </Link>

        <Typography variant="body1" fontWeight="bold">
          Products
        </Typography>
        <Box mb={2}>
          {record?.products?.map((item: any) => {
            return (
              <Link href={`/products/show/${item.product._id}`}>
                <TextField value={item.product.name} />
              </Link>
            );
          })}
        </Box>

        <Typography variant="body1" fontWeight="bold">
          Full Name
        </Typography>
        <TextField value={record?.fullName} mb={2} />

        <Typography variant="body1" fontWeight="bold">
          Phone Number
        </Typography>
        <NumberField value={record?.phoneNumber ?? ""} mb={2} />

        <Typography variant="body1" fontWeight="bold">
          Address
        </Typography>
        <TextField value={record?.address} mb={2} />

        <Typography variant="body1" fontWeight="bold">
          Nearest Landmark
        </Typography>
        <TextField value={record?.nearestLandmark} mb={2} />

        <Typography variant="body1" fontWeight="bold">
          Order Status
        </Typography>
        <TextField value={record?.orderStatus} mb={2} />

        <Typography variant="body1" fontWeight="bold">
          Created At
        </Typography>
        <DateField value={record?.createdAt} mb={2} />

        <Typography variant="body1" fontWeight="bold">
          Updated At
        </Typography>
        <DateField value={record?.updatedAt} mb={2} />

        <Typography variant="body1" fontWeight="bold">
          Total Price
        </Typography>
        <NumberField value={record?.totalPrice ?? ""} mb={2} />
      </Stack>
    </Show>
  );
};
