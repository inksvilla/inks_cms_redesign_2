import { useShow, IResourceComponentsProps } from "@refinedev/core";
import {
  Show,
  TextFieldComponent as TextField,
  TagField,
  NumberField,
  DateField,
} from "@refinedev/mui";
import { Typography, Stack, Box } from "@mui/material";

export const ProductShow: React.FC<IResourceComponentsProps> = () => {
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
          Name
        </Typography>
        <TextField value={record?.name} mb={2} />

        <Typography variant="body1" fontWeight="bold">
          Description
        </Typography>
        <TextField value={record?.description} mb={2} />

        <Box component="img" />

        {/* <Typography variant="body1" fontWeight="bold"> */}
        {/*   Images */}
        {/* </Typography> */}
        {/* <MarkdownField value={record?.images} /> */}

        <Typography variant="body1" fontWeight="bold">
          Currency
        </Typography>
        <TextField value={record?.currency} mb={2} />

        <Typography variant="body1" fontWeight="bold">
          Ratings
        </Typography>
        <Stack direction="row" spacing={1} mb={2}>
          {record?.ratings?.map((item: number) => (
            <TagField value={item} key={item} />
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
        <DateField value={record?.createdAt} />
      </Stack>
    </Show>
  );
};
