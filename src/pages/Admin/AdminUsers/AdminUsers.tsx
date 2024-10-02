import { useEffect, useState } from "react";
import { getAllUsers } from "../../../api/userApiCalls";
import "./AdminUsers.css";

interface User {
  _id: string;
  name: string;
  surname: string;
  email: string;
  dni: string;
  role: string;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers(token!);
        setUsers(response.data.users);
        setLoading(false);
      } catch (error: any) {
        setError("Failed to fetch users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="admin-users">
      <h1>Users</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>DNI</th>
            <th>Role</th>
            <th>Verified</th>
            <th>Active</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.email}</td>
              <td>{user.dni}</td>
              <td>{user.role}</td>
              <td>{user.isVerified ? "Yes" : "No"}</td>
              <td>{user.isActive ? "Yes" : "No"}</td>
              <td>{new Date(user.createdAt).toLocaleString()}</td>
              <td>{new Date(user.updatedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
