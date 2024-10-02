import { Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import AdminWelcome from "../pages/Admin/AdminWelcome/AdminWelcome";
import AdminUsers from "../pages/Admin/AdminUsers/AdminUsers";
import AdminRooms from "../pages/Admin/AdminRooms/AdminRooms";
import AdminAccessHistory from "../pages/Admin/AdminAccessHistory/AdminAccessHistory";
import AdminReports from "../pages/Admin/AdminReports/AdminReports";
import ProtectedRoute from "../guards/ProtectedRoute";

const adminRoutes = (
  <>
    <Route
      element={
        <ProtectedRoute requiredRoles={["admin", "superAdmin"]}>
          <AdminLayout />
        </ProtectedRoute>
      }
    >
      <Route path="/admin" element={<AdminWelcome />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/admin/rooms" element={<AdminRooms />} />
      <Route path="/admin/access-history" element={<AdminAccessHistory />} />
      <Route path="/admin/reports" element={<AdminReports />} />
    </Route>
  </>
);

export default adminRoutes;
