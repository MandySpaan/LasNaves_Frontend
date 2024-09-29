import { useState } from "react";
import { RegisterPayload, registerUser } from "../../api/authApiCalls";
import "./Register.css";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterPayload>({
    name: "",
    surname: "",
    startUp: "",
    email: "",
    dni: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const payload: RegisterPayload = {
      name: formData.name,
      surname: formData.surname,
      startUp: formData.startUp,
      email: formData.email,
      dni: formData.dni,
      phone: formData.phone,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };

    const response = await registerUser(payload);

    if (response.success) {
      setSuccessMessage("Registration successful! Please verify your email.");
      setError(null);
    } else {
      setError(response.error || "Something went wrong");
      setSuccessMessage(null);
    }
  };
  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="surname"
          placeholder="Surname"
          value={formData.surname}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="startUp"
          placeholder="Startup (optional)"
          value={formData.startUp}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="dni"
          placeholder="DNI"
          value={formData.dni}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone (optional)"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit">Register</button>
      </form>
      <div className="login-text">
        Already have an account? <Link to="/login">Login here</Link>
      </div>
    </div>
  );
};

export default Register;
