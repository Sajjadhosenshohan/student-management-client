import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useAxiosPublic } from "../Hooks/UseAxiosPublic";
import { useAxiosSecure } from "../Hooks/useAxiosSecure";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const fetchUserInfo = async (userId) => {
    try {
      const response = await axiosSecure.get(`/auth/getUserInfo/${userId}`);

      if (response.data.success) {
        return response.data.data;
      }
      throw new Error("Failed to fetch user info");
    } catch (error) {
      console.error("Error fetching user info:", error);
      throw error;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const userData = await fetchUserInfo(decoded.id);
          setUser(userData);
        } catch (error) {
          console.error("Auth initialization error:", error);
          localStorage.removeItem("token");
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await axiosPublic.post("/auth/login", {
        email,
        password,
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Login failed");
      }

      const token = response.data.data.token;
      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      const userData = await fetchUserInfo(decoded.id);
      setUser(userData);

      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      setLoading(true);
      const response = await axiosPublic.post("/auth/register", {
        name,
        email,
        password,
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Registration failed");
      }

      const token = response.data.data.token;
      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      const userData = await fetchUserInfo(decoded.id);
      setUser(userData);

      toast.success("Registration successful!");
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out successfully");
  };

  const authInfo = {
    user,
    loading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};