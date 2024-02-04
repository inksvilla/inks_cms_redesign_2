import { useShow, IResourceComponentsProps } from "@refinedev/core";
import React from "react";
import {
  Show,
  TextFieldComponent as TextField,
  TagField,
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

        <Typography variant="body1" fontWeight="bold">
          Capacity
        </Typography>

        <Stack direction="row" spacing={3} mb={2}>
          {record?.operatingDays?.map((item: any) => {
            return (
              <Box>
                <Typography
                  textTransform="capitalize"
                  variant="body1"
                  fontWeight="medium"
                >
                  {item.day}
                </Typography>
                <TextField value={item.capacity} mb={2} />
              </Box>
            );
          })}
        </Stack>

        <Typography variant="body1" fontWeight="bold">
          Attributes
        </Typography>
        <Stack overflow="scroll" direction="row" spacing={3} mb={2}>
          {record?.attributes?.map((item: any, index: number) => {
            const customAttributeKeys = Object.keys(item.attribute);

            return (
              <Box
                key={index}
                sx={{
                  flexShrink: 0,
                  paddingTop: 2,
                  paddingX: 2,
                  border: "2px solid #E5E7EB",
                }}
              >
                <Typography variant="body1" fontWeight="medium">
                  Price
                </Typography>
                <TextField
                  value={`${record?.currency} ${item?.price}`}
                  mb={2}
                />

                <Typography variant="body1" fontWeight="medium">
                  Items in stock
                </Typography>
                <TextField value={item?.itemsInStock} mb={2} />

                {customAttributeKeys?.map((key) => {
                  return (
                    <React.Fragment key={key}>
                      <Typography
                        textTransform="capitalize"
                        variant="body1"
                        fontWeight="medium"
                      >
                        {key}
                      </Typography>
                      <TextField value={item.attribute[key]} mb={2} />
                    </React.Fragment>
                  );
                })}
              </Box>
            );
          })}
        </Stack>

        <Typography variant="body1" fontWeight="bold">
          Images
        </Typography>
        <Box sx={{ display: "flex", gap: "2rem", overflow: "scroll" }} mb={2}>
          {record?.images?.map((image: string) => (
            <Box
              component="img"
              sx={{
                width: 150,
                height: 150,
                objectFit: "cover",
              }}
              alt="Service images"
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
