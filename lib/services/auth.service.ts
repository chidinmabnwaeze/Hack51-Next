import axios from "axios";
import api from "../api";

export const login = async (data: { email: string; password: string }) => {
  const res = await api.post("auth/login", data);
  return res.data;
};

export const register = async (data: {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
}) => {
  const res = await api.post("auth/signup", data);
  return res.data;
};
