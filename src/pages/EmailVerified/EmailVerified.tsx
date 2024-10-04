import { Link } from "react-router-dom";
import "./EmailVerified.css";

const EmailVerified: React.FC = () => {
  return (
    <div className="emailverified-container">
      <h2>Email Verified Successfully!</h2>
      <p>You can now log in to your account.</p>
      <Link to="/login">Go to Login</Link>
    </div>
  );
};

export default EmailVerified;
