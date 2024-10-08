import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import {
  LoginPayload,
  loginUser,
  requestPasswordReset,
  resendVerificationEmail,
} from "../../api/authApiCalls";
import { jwtDecode } from "jwt-decode";
import "./Login.css";

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginPayload>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [messageLink, setMessageLink] = useState<string | null>(null);
  const [messageEmailSent, setMessageEmailSent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await loginUser(formData);
      if (response.success) {
        const token = response.data.token;
        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.userId;

        authContext?.login(token, userId);

        navigate("/profile");
      } else {
        setError(response.error || "An unexpected error occurred.");
        if (
          response.error ===
          "Email is not verified. Please verify your email first."
        ) {
          setMessageEmailSent(null);
          setMessageLink("Resend verification email");
        } else if (response.error === "Invalid email or password") {
          setMessageEmailSent(null);
          setMessageLink("Send email to reset password");
        }
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerificationEmail = async () => {
    setLoading(true);
    setMessageLink(null);
    try {
      const response = await resendVerificationEmail(formData.email);
      if (response.success) {
        setMessageEmailSent("Verification email sent successfully");
      } else {
        setError(response.error || "An unexpected error occurred.");
      }
    } catch (error) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setLoading(true);
    setError(null);
    setMessageLink(null);
    try {
      const response = await requestPasswordReset(formData.email);
      if (response.success) {
        setMessageEmailSent("Email to reset password sent");
      } else {
        setError(response.error || "An unexpected error occurred.");
      }
    } catch (error) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        {messageLink && (
          <div
            className="send-email-link"
            onClick={
              messageLink === "Resend verification email"
                ? handleResendVerificationEmail
                : handleResetPassword
            }
          >
            {messageLink}
          </div>
        )}
        {messageEmailSent && (
          <p className="email-sent-text">{messageEmailSent}</p>
        )}
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
      <div className="register-text">
        Don't have an account yet? <Link to="/register">Register here</Link>
      </div>
    </div>
  );
};

export default LoginForm;
