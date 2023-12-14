import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useCheckToken = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      const tokenExpiration = localStorage.getItem("tokenExpiration");

      if (storedToken && storedUser && tokenExpiration) {
        const currentTime = new Date().getTime();
        if (currentTime < tokenExpiration) {
          const user = JSON.parse(storedUser);
          console.log("User:", user);
        } else {
          console.log("Token has expired, please log in again");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("tokenExpiration");
          navigate("/");
        }
      } else {
        console.log("Token not found, please log in");
        navigate("/");
      }
    };

    checkToken();
  }, [navigate]);
};

export default useCheckToken;
