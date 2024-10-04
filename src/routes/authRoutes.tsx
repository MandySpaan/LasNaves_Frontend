import { Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import EmailVerified from "../pages/EmailVerified/EmailVerified";

const authRoutes = (
  <>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/email-verified" element={<EmailVerified />} />
  </>
);

export default authRoutes;
