import { axiosInstance } from "@refinedev/simple-rest";
import { API_URL } from "../constants";

interface Props {
  email: string;
  password: string;
}

async function handleLogin({ email, password }: Props) {
  const response = await axiosInstance.post(`${API_URL}/users/login`, {
    email,
    password,
  });

  return response.data;
}

export default handleLogin;
