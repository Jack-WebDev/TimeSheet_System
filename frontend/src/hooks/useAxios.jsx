import { useEffect } from "react";
import axios from "axios";
import useRefresh from "./useRefreshToken";
import { useAuthContext } from "./useAuthContext";

const useAxios = () => {
  const refresh = useRefresh();
  const auth = useAuthContext();

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newToken = await refresh();
          console.log(newToken)
          prevRequest.headers["Authorization"] = `Bearer ${newToken}`;

          return axios(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, refresh]);

  return axios;
};

export default useAxios;
