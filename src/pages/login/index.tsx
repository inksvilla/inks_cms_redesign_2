import { Typography } from "@mui/material";
import { AuthPage } from "@refinedev/mui";

export const Login = () => {
  return (
    <AuthPage
      type="login"
      rememberMe={false}
      forgotPasswordLink={false}
      registerLink={false}
      title={
        <Typography fontWeight="bold" fontSize={24}>
          Inksvilla
        </Typography>
      }
    />
  );
};
