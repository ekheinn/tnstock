import { useState, useEffect } from "react";
import AppRoutes from "./routes";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token") || Cookies.get("token");
    if (token) {
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    toast.success("Logout realizado com sucesso!");
  };

  return (
    <>
      <ToastContainer />
      <AppRoutes
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        handleLogout={handleLogout}
        loading={loading}
      />
    </>
  );
};

export default App;
