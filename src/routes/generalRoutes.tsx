import { Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Rooms from "../pages/Rooms/Rooms";
import MainLayout from "../layouts/MainLayout/MainLayout";

const generalRoutes = (
  <>
    <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/rooms" element={<Rooms />} />
    </Route>
  </>
);

export default generalRoutes;
