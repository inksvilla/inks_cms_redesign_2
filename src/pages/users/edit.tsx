import { Edit } from "@refinedev/mui";
import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps } from "@refinedev/core";

// const USER_STATUS = {
//   Active: "active",
//   Suspended: "suspended",
//   Blocked: "blocked",
//   Pending: "pending",
// };

export const UserEdit: React.FC<IResourceComponentsProps> = () => {
  const {
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm();

  // const usersData = queryResult?.data?.data;

  return (
    <Edit canDelete={false} saveButtonProps={saveButtonProps}>
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

        {/* <ReactHookFormSelect */}
        {/*   name="status" */}
        {/*   label="User Status" */}
        {/*   control={control} */}
        {/* > */}
        {/*   {Object.keys(USER_STATUS).map((status) => ( */}
        {/*     <MenuItem value={USER_STATUS[status]}>{status}</MenuItem> */}
        {/*   ))} */}
        {/* </ReactHookFormSelect> */}
      </Box>
    </Edit>
  );
};
