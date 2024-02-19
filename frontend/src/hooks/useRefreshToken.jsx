import { useAuthContext } from "./useAuthContext";
import axios from "axios";

const useRefreshToken = () => {
  const { setAuth } = useAuthContext();

  const refresh = async () => {
    const response = await axios.get("http://localhost:8001/api/auth/token", {
      withCredentials: true,
    });

    setAuth((prev) => {
      return { ...prev, token: response.data.token };
    });

    return response.data.token;
  };

  return refresh;
};

export default useRefreshToken;
