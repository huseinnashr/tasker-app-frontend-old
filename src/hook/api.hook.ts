import { useState, useContext } from "react";
import axios, { Method } from "axios";
import { AuthContext } from "../context";
import { ErrorResponseDTO } from "../type";

const baseURL = "http://localhost:1337";

export const useApi = <T>(
  method: Method,
  url: string
): [
  T | null,
  ErrorResponseDTO | null,
  boolean,
  (data?: any) => Promise<void>
] => {
  const { auth } = useContext(AuthContext);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ErrorResponseDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const api = axios.create({
    baseURL,
    headers: { Authorization: auth ? `Bearer ${auth.accessToken}` : "" },
    method,
    url,
  });

  const fetch = async (data?: any) => {
    setData(null);
    setError(null);
    setLoading(true);
    try {
      const res = await api.request<T>({ data });
      setData(res.data);
    } catch (e) {
      if (e.response) {
        const { status, data } = e.response;
        if (data && data.message) {
          setError({ statusCode: status as number, message: data.message });
        } else {
          setError({
            statusCode: status as number,
            message: `Unknown ${status} Server Response`,
          });
        }
      } else if (e.request) {
        setError({
          statusCode: 0,
          message: "You're offline or server is down",
        });
      } else {
        console.log(e);
      }
    }
    setLoading(false);
  };

  return [data, error, loading, fetch];
};