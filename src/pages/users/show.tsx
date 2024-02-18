import { useShow, IResourceComponentsProps } from "@refinedev/core";
import {
  Show,
  EmailField,
  NumberField,
  TextFieldComponent as TextField,
  DateField,
} from "@refinedev/mui";
import { Typography, Stack, Box } from "@mui/material";

export const UserShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;
  console.log(record);

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        {record?.picture.profile && (
          <Box>
            <Box
              component="img"
              sx={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                objectFit: "cover",
              }}
              alt="User Profile"
              src={record?.picture?.profile}
            />
          </Box>
        )}

        <Typography variant="body1" fontWeight="bold">
          Name
        </Typography>
        <TextField value={record?.name} mb={2} />

        <Box mb={2}>
          <Typography variant="body1" fontWeight="bold">
            Email
          </Typography>
          <EmailField value={record?.email} />
        </Box>

        <Typography variant="body1" fontWeight="bold">
          Phone Number
        </Typography>
        <NumberField value={record?.phoneNumber ?? ""} mb={2} />

        <Typography variant="body1" fontWeight="bold">
          Role
        </Typography>
        <TextField value={record?.role} mb={2} />

        <Typography variant="body1" fontWeight="bold">
          Status
        </Typography>
        <TextField value={record?.status} mb={2} />

        <Typography variant="body1" fontWeight="bold">
          Currency
        </Typography>
        <TextField value={record?.currency} mb={2} />

        <Typography variant="body1" fontWeight="bold">
          Followers
        </Typography>
        <NumberField value={record?.numFollowers ?? ""} mb={2} />

        <Typography variant="body1" fontWeight="bold">
          Followings
        </Typography>
        <NumberField value={record?.numFollowings ?? ""} mb={2} />

        <Typography variant="body1" fontWeight="bold">
          Reviews
        </Typography>
        <NumberField value={record?.numReviews ?? ""} mb={2} />

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
