import { Edit } from "@refinedev/mui";
import { Box, TextField, Checkbox, FormControlLabel } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps } from "@refinedev/core";
import { Controller } from "react-hook-form";

export const MerchantEdit: React.FC<IResourceComponentsProps> = () => {
  const {
    saveButtonProps,
    register,
    control,
    formState: { errors },
  } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("country", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.country}
          helperText={(errors as any)?.country?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Country"
          name="country"
        />
        <Controller
          control={control}
          name="featured"
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <FormControlLabel
              label="Featured"
              control={
                <Checkbox
                  {...field}
                  checked={field.value}
                  onChange={(event) => {
                    field.onChange(event.target.checked);
                  }}
                />
              }
            />
          )}
        />
        <TextField
          {...register("companyName", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.companyName}
          helperText={(errors as any)?.companyName?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Company Name"
          name="companyName"
        />
        <TextField
          {...register("companyType", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.companyType}
          helperText={(errors as any)?.companyType?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Company Type"
          name="companyType"
        />
        <TextField
          {...register("companyAddress", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.companyAddress}
          helperText={(errors as any)?.companyAddress?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Company Address"
          name="companyAddress"
        />
        <TextField
          {...register("documentNumber", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.documentNumber}
          helperText={(errors as any)?.documentNumber?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Document Number"
          name="documentNumber"
        />
      </Box>
    </Edit>
  );
};
