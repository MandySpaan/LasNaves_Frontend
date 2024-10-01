import UserDetails from "../../components/UserDetails/UserDetails";
import UserReservations from "../../components/UserReservations/UserReservations";
import UserStatus from "../../components/UserStatus/UserStatus";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile-list">
      <UserStatus />
      <UserReservations />
      <UserDetails />
    </div>
  );
};

export default Profile;
