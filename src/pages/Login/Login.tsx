import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import {
  LoginPayload,
  loginUser,
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
  const [showEmailSent, setShowEmailSent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showResendEmail, setShowResendEmail] = useState<boolean>(false);

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
          setShowEmailSent(false);
          setMessageLink("Resend verification email");
          setShowResendEmail(true);
        }
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setLoading(true);
    setShowResendEmail(false);
    try {
      const response = await resendVerificationEmail(formData.email);
      if (response.success) {
        setMessageEmailSent("Verification email sent successfully.");
        setShowEmailSent(true);
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
        {showResendEmail && (
          <div className="send-email-link" onClick={handleResendEmail}>
            {messageLink}
          </div>
        )}
        {showEmailSent && <p className="email-sent-text">{messageEmailSent}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className="register-text">
        Don't have an account yet? <Link to="/register">Register here</Link>
      </div>
    </div>
  );
};

export default LoginForm;
