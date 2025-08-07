import config from "@/config";
import axios from "axios";

async function login({ email, password }) {
  return await axios.post(`${config.apiUrl}/api/auth/login`, {
    email,
    password,
  });
}

async function register(data) {
  return await axios.post(`${config.apiUrl}/api/auth/register`, data);
}

async function forgotPassword(data) {
  return await axios.post(`${config.apiUrl}/api/auth/forgot-password`, data);
}

async function resetPassword(id, token, data) {
  return await axios.post(
    `${config.apiUrl}/api/auth/reset-password/${id}?token=${token}`,
    data
  );
}

export { login, register, forgotPassword, resetPassword };
