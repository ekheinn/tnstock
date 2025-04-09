import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Register from "./pages/register";
import ConfirmEmail from "./pages/confirmRegister";
import Login from "./pages/login";
import AuthRoute from "./components/authRoute";
import Dashboard from "./pages/dashboard";
import Header from "./components/header";
import EditProfile from "./pages/editUser";
import ForgotPassword from "./pages/forgetPassword";
import ResetPassword from "./pages/resetPassword";

const AppRoutes = ({
  isAuthenticated,
  setIsAuthenticated,
  handleLogout,
  loading,
}) => {
  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirm-email/:token" element={<ConfirmEmail />} />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route
          element={
            <AuthRoute isAuthenticated={isAuthenticated} loading={loading} />
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
