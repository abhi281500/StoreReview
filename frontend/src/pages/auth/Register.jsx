import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext.jsx";

const Register = () => {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setSuccess("");

      await register(formData);

      setSuccess(
        "Registration successful. You can now login."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div>
      <h1>Register</h1>

      {error && <p>{error}</p>}

      {success && <p>{success}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          minLength={1}
          maxLength={100}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          maxLength={400}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          minLength={8}
          maxLength={16}
          required
        />

        <button type="submit">
          Register
        </button>

        <p>Already Have an account ?</p>
      <button
      type="button"
      onClick={() => navigate("/login")}
      >
      Login
    </button>
      </form>
    </div>
  );
};

export default Register;