import { useShow, IResourceComponentsProps } from "@refinedev/core";
import {
  Show,
  TextFieldComponent as TextField,
  BooleanField,
  NumberField,
} from "@refinedev/mui";
import { Typography, Stack, Box } from "@mui/material";

export const MerchantShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          User
        </Typography>
        <TextField value={record?.user?.name} mb={2} />

        <Typography variant="body1" fontWeight="bold">
          Country
        </Typography>
        <TextField value={record?.country} mb={2} />

        <Box mb={2}>
          <Typography variant="body1" fontWeight="bold">
            Featured
          </Typography>
          <BooleanField value={record?.featured} />
        </Box>

        <Typography variant="body1" fontWeight="bold">
          Company Name
        </Typography>
        <TextField value={record?.companyName} mb={2} />

        <Typography variant="body1" fontWeight="bold">
          Company Type
        </Typography>
        <TextField value={record?.companyType} mb={2} />

        <Typography variant="body1" fontWeight="bold">
          Company Address
        </Typography>
        <TextField value={record?.companyAddress} mb={2} />

        <Typography variant="body1" fontWeight="bold">
          Document Number
        </Typography>
        <NumberField value={record?.documentNumber ?? ""} mb={2} />

        <Typography variant="body1" fontWeight="bold">
          Document Images
        </Typography>
        <Box sx={{ display: "flex", gap: "2rem", overflow: "scroll" }} mb={2}>
          {record?.documentImages?.map((image: string) => (
            <Box
              component="img"
              sx={{
                width: 150,
                height: 150,
                objectFit: "cover",
              }}
              alt="Product images"
              src={image}
            />
          ))}
        </Box>
      </Stack>
    </Show>
  );
};
