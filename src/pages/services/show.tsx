import { useShow, IResourceComponentsProps } from "@refinedev/core";
import {
  Show,
  TextFieldComponent as TextField,
  TagField,
  MarkdownField,
  NumberField,
  DateField,
} from "@refinedev/mui";
import { Typography, Stack, Box } from "@mui/material";

export const ServiceShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          Name
        </Typography>
        <TextField value={record?.name} mb={2} />

        <Typography variant="body1" fontWeight="bold">
          Description
        </Typography>
        <TextField value={record?.description} mb={2} />

        <Box sx={{ display: "flex", gap: "2rem", overflow: "scroll" }} mb={2}>
          {record?.images?.map((image: string) => (
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
        <Typography variant="body1" fontWeight="bold">
          User
        </Typography>
        <TextField value={record?.user?.name} mb={2} />

        <Typography variant="body1" fontWeight="bold">
          Currency
        </Typography>
        <TextField value={record?.currency} mb={2} />

        <Typography variant="body1" fontWeight="bold">
          Status
        </Typography>
        <TextField value={record?.status} mb={2} />

        <Typography variant="body1" fontWeight="bold">
          Ratings
        </Typography>
        <Stack direction="row" spacing={1} mb={2}>
          {record?.ratings?.map((item: number, index: number) => (
            <TagField value={item} key={index} />
          ))}
        </Stack>

        <Typography variant="body1" fontWeight="bold">
          Total Rating
        </Typography>
        <NumberField value={record?.totalRating ?? ""} mb={2} />

        <Typography variant="body1" fontWeight="bold">
          Avg Rating
        </Typography>
        <NumberField value={record?.avgRating ?? ""} mb={2} />

        <Typography variant="body1" fontWeight="bold">
          Rating Count
        </Typography>
        <NumberField value={record?.ratingCount ?? ""} mb={2} />

        <Typography variant="body1" fontWeight="bold">
          Created At
        </Typography>
        <DateField value={record?.createdAt} mb={2} />

        <Typography variant="body1" fontWeight="bold">
          Updated At
        </Typography>
        <DateField value={record?.updatedAt} />
      </Stack>
    </Show>
  );
};
