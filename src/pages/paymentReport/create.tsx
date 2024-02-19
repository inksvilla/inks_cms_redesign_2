import { Create } from "@refinedev/mui";
import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps } from "@refinedev/core";
import { useLocation } from "react-router-dom";

export const PaymentReportCreate: React.FC<IResourceComponentsProps> = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const merchantId = searchParams.get("merchantId");
  const merchantName = searchParams.get("merchantName");

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        {merchantId && (
          <input {...register("merchant")} type="hidden" value={merchantId} />
        )}

        <TextField
          disabled
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={merchantName}
          label="Merchant"
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
          disabled
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          value={0}
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
