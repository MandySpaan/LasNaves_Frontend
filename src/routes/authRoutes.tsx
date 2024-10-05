import { Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import EmailVerified from "../pages/EmailVerified/EmailVerified";
import NewPassword from "../pages/ResetPassword/ResetPassword";

const authRoutes = (
  <>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/email-verified" element={<EmailVerified />} />
    <Route path="/reset-password" element={<NewPassword />} />
  </>
);

export default authRoutes;
