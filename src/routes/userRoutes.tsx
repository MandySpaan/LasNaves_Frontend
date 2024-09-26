import { Route } from "react-router-dom";
import Profile from "../pages/Profile/Profile";
import MainLayout from "../layouts/MainLayout/MainLayout";

const userRoutes = (
  <>
    <Route element={<MainLayout />}>
      <Route path="/profile" element={<Profile />} />
    </Route>
  </>
);

export default userRoutes;
