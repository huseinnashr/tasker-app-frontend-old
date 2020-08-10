import { useState, useContext, useCallback } from "react";
import axios, { Method } from "axios";
import { AuthContext } from "../context";
import { ErrorResponseDTO } from "../type";

const baseURL = "http://localhost:1337";

interface useApiProps {
  method: Method;
  url: string;
  errorEffect?: boolean;
}

type useApiReturn<T, U> = [
  ErrorResponseDTO | null,
  boolean,
  (data?: U) => Promise<T | null>
];

export const useApi = <T, U = any>({
  method,
  url,
  errorEffect = true,
}: useApiProps): useApiReturn<T, U> => {
  const { auth, setAuth } = useContext(AuthContext);
  const [error, setError] = useState<ErrorResponseDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getApi = useCallback(() => {
    return axios.create({
      baseURL,
      headers: { Authorization: auth ? `Bearer ${auth.accessToken}` : "" },
      method,
      url,
    });
  }, [method, url, auth]);

  const fetch = useCallback(
    async (data?: U): Promise<T | null> => {
      setError(null);
      setLoading(true);
      try {
        const res = await getApi().request<T>({ data });
        setLoading(false);
        return res.data;
      } catch (e) {
        setLoading(false);
        if (e.response) {
          const { status, data } = e.response;
          if (errorEffect && status === 401) {
            setAuth(null);
            return null;
          } else if (data && data.message) {
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
      return null;
    },
    [getApi, errorEffect, setAuth, setError, setLoading]
  );

  return [error, loading, fetch];
};
