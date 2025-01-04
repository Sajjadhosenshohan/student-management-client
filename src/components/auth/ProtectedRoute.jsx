import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthProvider";
import Loader from "../common/Loader";

const ProtectedRoute = ({ children }) => {
  const { loading } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  if (loading) {
    return <Loader />;
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
