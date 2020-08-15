import axios, { Method, AxiosInstance } from "axios";
import { ErrorResponseDTO } from "../type";
import { AuthContext } from "../context";

interface apiServiceOptions {
  method: Method;
  url: string;
  errorEffect?: boolean;
}

const baseURL = "http://localhost:1337";

export class ApiService<T, U = any> {
  private _error: ErrorResponseDTO | null = null;
  private _loading: boolean = false;
  private axios: AxiosInstance;

  constructor(
    private authCtx: React.ContextType<typeof AuthContext>,
    private options: apiServiceOptions
  ) {
    const { method, url } = options;
    this.axios = axios.create({
      baseURL,
      headers: {
        Authorization: authCtx.auth ? `Bearer ${authCtx.auth.accessToken}` : "",
      },
      method,
      url,
    });
  }

  run = async (data: U): Promise<T | null> => {
    this._error = null;
    this._loading = true;

    let ret: T | null = null;

    try {
      const res = await this.axios.request<T>({ data });
      this._loading = false;
      ret = res.data;
    } catch (e) {
      this._loading = false;
      this._error = this.transformError(e);
      if (this.options.errorEffect && this.error?.statusCode === 401) {
        this.authCtx.setAuth(null);
      }
    }
    return ret;
  };

  private transformError(e: any): ErrorResponseDTO {
    if (e.response) {
      const { status, data } = e.response;
      if (data && data.message) {
        return { statusCode: status as number, message: data.message };
      } else {
        return {
          statusCode: status as number,
          message: `Unknown ${status} Server Response`,
        };
      }
    } else if (e.request) {
      return {
        statusCode: 0,
        message: "You're offline or server is down",
      };
    } else {
      throw e;
    }
  }

  reset = () => {
    this._error = null;
    this._loading = false;
  };

  get error() {
    return this._error;
  }

  get loading() {
    return this._loading;
  }
}
