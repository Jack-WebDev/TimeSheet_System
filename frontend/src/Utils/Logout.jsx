import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Logout = () => {
  const clearCookie = (name) => {
    document.cookie =
      name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post("http://localhost:8001/api/auth/logout");
        clearCookie("jwt");
        navigate("/");
      } catch (error) {
        toast.error("Error logging out. Please try again.");
      }
    };

    logout();
  });
};

export default Logout;
