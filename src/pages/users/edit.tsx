import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps } from "@refinedev/core";
import { Controller } from "react-hook-form";
import { UserStatus } from "../../constants";
import { Edit } from "@refinedev/mui";

export const UserEdit: React.FC<IResourceComponentsProps> = () => {
  const {
    saveButtonProps,
    register,
    formState: { errors },
    control,
  } = useForm();

  return (
    <Edit canDelete={false} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <Box mb={3}>
          <TextField
            {...register("name", {
              required: "This field is required",
              maxLength: { value: 100, message: "Max length is 100" },
              minLength: { value: 3, message: "Min length is 3" },
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
        </Box>

        <FormControl>
          <InputLabel id="status-label">Status</InputLabel>
          <Controller
            control={control}
            name="status"
            rules={{ required: "This field is required" }}
            render={({ field }) => {
              return (
                <Select
                  labelId="status-label"
                  id="userStatus"
                  label="Status"
                  value={field.value || ""}
                  onChange={field.onChange}
                >
                  {Object.keys(UserStatus).map((k: string) => (
                    <MenuItem
                      key={k}
                      value={UserStatus[k as keyof typeof UserStatus]}
                    >
                      {k}
                    </MenuItem>
                  ))}
                </Select>
              );
            }}
          />
        </FormControl>

        <Box>
          <TextField
            {...register("password", {
              maxLength: { value: 30, message: "Max length is 30" },
              minLength: { value: 6, message: "Min length is 6" },
            })}
            error={!!(errors as any)?.password}
            helperText={(errors as any)?.password?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="password"
            label="Password"
            name="password"
          />
        </Box>
      </Box>
    </Edit>
  );
};
