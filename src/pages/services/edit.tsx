import { Edit } from "@refinedev/mui";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps } from "@refinedev/core";
import { Controller } from "react-hook-form";
import { ServiceStatus, Currencies } from "../../constants";

export const ServiceEdit: React.FC<IResourceComponentsProps> = () => {
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
          {...register("name", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.name}
          helperText={(errors as any)?.name?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Name"
          name="name"
        />
        <Box mb={1}>
          <TextField
            {...register("description", {
              required: "This field is required",
            })}
            error={!!(errors as any)?.description}
            helperText={(errors as any)?.description?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="text"
            label="Description"
            name="description"
          />
        </Box>
        <Box mb={2}>
          <FormControl fullWidth>
            <InputLabel id="status-label">Status</InputLabel>
            <Controller
              control={control}
              name="status"
              rules={{ required: "This field is required" }}
              render={({ field }) => {
                return (
                  <Select
                    labelId="status-label"
                    id="status"
                    label="Status"
                    value={field.value || ""}
                    onChange={field.onChange}
                  >
                    {Object.keys(ServiceStatus).map((k: string) => (
                      <MenuItem
                        key={k}
                        value={ServiceStatus[k as keyof typeof ServiceStatus]}
                      >
                        {k}
                      </MenuItem>
                    ))}
                  </Select>
                );
              }}
            />
          </FormControl>
        </Box>
        <FormControl>
          <InputLabel id="currency-label">Currency</InputLabel>
          <Controller
            control={control}
            name="currency"
            rules={{ required: "This field is required" }}
            render={({ field }) => {
              return (
                <Select
                  labelId="currency-label"
                  id="currency"
                  label="Currency"
                  value={field.value || ""}
                  onChange={field.onChange}
                >
                  {Object.keys(Currencies).map((k: string) => (
                    <MenuItem
                      key={k}
                      value={Currencies[k as keyof typeof Currencies]}
                    >
                      {k}
                    </MenuItem>
                  ))}
                </Select>
              );
            }}
          />
        </FormControl>
      </Box>
    </Edit>
  );
};
