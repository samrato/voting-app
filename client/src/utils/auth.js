import { useNavigate } from "react-router-dom";
import API_URL from "../apiConfig";

const useAuth = () => {
    const navigate = useNavigate();
  
    const login = async (email, password) => {
      try {
        const response = await fetch(`${API_URL}/voters/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (!response.ok) {
          throw new Error("Login failed");
        }
  
        const data = await response.json();
        localStorage.setItem("token", data.token);
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    };
  
    const logout = () => {
      localStorage.removeItem("token");
      navigate("/login");
    };
  
    return { login, logout };
  };
  
  export default useAuth;