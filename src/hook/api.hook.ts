import { useState, useContext } from "react";
import axios, { Method } from "axios";
import { AuthContext } from "../context";

const baseURL = "http://localhost:1337";

export const useApi = <T>(
  method: Method,
  url: string
): [T | null, (data?: any) => Promise<void>] => {
  const { auth } = useContext(AuthContext);
  const [data, setData] = useState<T | null>(null);

  const api = axios.create({
    baseURL,
    headers: { Authorization: auth ? `Bearer ${auth.accessToken}` : "" },
    method,
    url,
  });

  const fetch = async (data?: any) => {
    const res = await api.request<T>({ data });

    setData(res.data);
  };

  return [data, fetch];
};
