import UserDetails from "../../components/UserDetails/UserDetails";
import UserStatus from "../../components/UserStatus/UserStatus";
import "./Profile.css";

const Profile = () => {
  return (
    <>
      <h1>Profile</h1>
      <UserStatus />
      <UserDetails />
    </>
  );
};

export default Profile;
