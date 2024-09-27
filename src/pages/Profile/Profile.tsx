import UserDetails from "../../components/UserDetails/UserDetails";
import UserReservations from "../../components/UserReservations/UserReservations";
import UserStatus from "../../components/UserStatus/UserStatus";
import "./Profile.css";

const Profile = () => {
  return (
    <>
      <h1>Profile</h1>
      <UserStatus />
      <UserReservations />
      <UserDetails />
    </>
  );
};

export default Profile;
