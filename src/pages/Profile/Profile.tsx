import UserDetails from "../../components/UserDetails/UserDetails";
import UserHistory from "../../components/UserHistory/UserHistory";
import UserReservations from "../../components/UserReservations/UserReservations";
import UserStatus from "../../components/UserStatus/UserStatus";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile-list">
      <UserStatus />
      <UserReservations />
      <UserDetails />
      <UserHistory />
    </div>
  );
};

export default Profile;
