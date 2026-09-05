import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext.jsx";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      setLoading(true);

      const response = await login(formData);

      const role = response.user.role;

      if (role === "ADMIN") {
        navigate("/admin");
      } else if (role === "USER") {
        navigate("/user");
      } else if (role === "STORE_OWNER") {
        navigate("/owner");
      }
    } 
    catch (error) {
      console.error("LOGIN ERROR:", error);
      setError(
        error.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button> 

        <p>Don't have an account </p>
        <button
  type="button"
  onClick={() => navigate("/register")}
>
  Register
</button>
        

      </form>
    </div>
  );
};

export default Login;