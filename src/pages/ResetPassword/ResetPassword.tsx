import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./ResetPassword.css";
import { resetPassword } from "../../api/authApiCalls";

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<Boolean>(false);
  const [searchParams] = useSearchParams();

  const resetToken = searchParams.get("token");
  const email = searchParams.get("email");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resetToken || !email) {
      setError("Invalid password reset link");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await resetPassword(password, resetToken, email);

      if (response.error) {
        setError(response.error);
      } else {
        setError(null);
        setSuccess(true);
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="password-reset-container">
      <h2>Reset Password</h2>
      {!success && (
        <form onSubmit={handleSubmit} className="password-reset-form">
          <div className="form-group">
            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="reset-button">
            Change Password
          </button>
        </form>
      )}
      {success && (
        <p className="success">
          Password has been reset <br />
          <Link to="/login">Go to login</Link>
        </p>
      )}
    </div>
  );
};

export default ResetPassword;
