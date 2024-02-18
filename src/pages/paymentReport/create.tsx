import { Create, useAutocomplete } from "@refinedev/mui";
import { Box, Autocomplete, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps } from "@refinedev/core";
import { Controller } from "react-hook-form";

export const PaymentReportCreate: React.FC<IResourceComponentsProps> = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
  } = useForm();

  const { autocompleteProps: merchantAutocompleteProps } = useAutocomplete({
    resource: "merchant/options",
    onSearch: (query) => {
      return [{ field: "name", operator: "contains", value: query }];
    },
  });

  // console.log(merchantAutocompleteProps);

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <Controller
          control={control}
          name="merchant"
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...merchantAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value._id);
              }}
              getOptionLabel={(selected) => {
                const result =
                  merchantAutocompleteProps.options.find(
                    (option) =>
                      option?._id ===
                      (typeof selected === "string" ? selected : selected._id)
                  )?.name || "";
                return result;
              }}
              // getOptionLabel={(selected) => }
              isOptionEqualToValue={(option, value) =>
                option?._id?.toString() === value
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Merchant"
                  margin="normal"
                  variant="outlined"
                  error={!!(errors as any)?.merchant}
                  helperText={(errors as any)?.merchant?.message}
                  required
                />
              )}
            />
          )}
        />
        <TextField
          {...register("debit", {
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.debit}
          helperText={(errors as any)?.debit?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Debit"
          name="debit"
        />
        <TextField
          {...register("credit", {
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.credit}
          helperText={(errors as any)?.credit?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Credit"
          name="credit"
        />
        <TextField
          {...register("paymentReference")}
          error={!!(errors as any)?.paymentReference}
          helperText={(errors as any)?.paymentReference?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Payment Reference"
          name="paymentReference"
        />
      </Box>
    </Create>
  );
};
