import "./AdminWelcome.css";

const AdminWelcome: React.FC = () => {
  return (
    <div className="welcome-admin-container">
      <h1>Welcome Las Naves Admin</h1>
      <p>
        Here, you can find information about users, rooms, access history. You
        can also create and find reports. If you want to return to the regular
        Las Naves website, you can do that by simply clicking on {}
        <i>Leave Admin View</i> in the navigation bar.
      </p>
    </div>
  );
};

export default AdminWelcome;
