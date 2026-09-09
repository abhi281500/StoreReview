import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext.jsx";


const Register = () => {
  const navigate = useNavigate();

  const { register } = useAuth();


  // ==========================================
  // Form State
  // ==========================================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });


  // ==========================================
  // UI State
  // ==========================================

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  // ==========================================
  // Handle Input Change
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    if (error) {
      setError("");
    }

    if (success) {
      setSuccess("");
    }
  };


  // ==========================================
  // Password Validation
  // ==========================================

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;

    return passwordRegex.test(password);
  };


  // ==========================================
  // Form Validation
  // ==========================================

  const validateForm = () => {

    const name = formData.name.trim();
    const email = formData.email.trim();
    const address = formData.address.trim();
    const password = formData.password;


    // Name
    if (name.length < 20 || name.length > 60) {
      return "Name must be between 20 and 60 characters.";
    }


    // Email
    if (!email) {
      return "Email is required.";
    }


    // Address
    if (!address) {
      return "Address is required.";
    }

    if (address.length > 400) {
      return "Address cannot exceed 400 characters.";
    }


    // Password
    if (!validatePassword(password)) {
      return (
        "Password must be 8–16 characters and include " +
        "at least one uppercase letter and one special character."
      );
    }


    return null;
  };


  // ==========================================
  // Handle Register
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError("");
    setSuccess("");


    // Validate
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }


    const credentials = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      address: formData.address.trim(),
      password: formData.password,
    };


    try {

      setLoading(true);

      await register(credentials);


      setSuccess(
        "Registration successful! Redirecting to login..."
      );


      // Clear form
      setFormData({
        name: "",
        email: "",
        address: "",
        password: "",
      });


      // Redirect
      setTimeout(() => {
        navigate("/login", {
          replace: true,
        });
      }, 1200);


    } catch (error) {

      console.error(
        "REGISTRATION ERROR:",
        error
      );

      setError(
        error.response?.data?.message ||
        error.message ||
        "Registration failed. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-50">

      {/* ======================================
          Main
      ====================================== */}

      <main className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">

        <div className="w-full max-w-lg">


          {/* ==================================
              Brand
          ================================== */}

          <div className="mb-8 text-center">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white shadow-lg shadow-blue-600/20">
              S
            </div>

            <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
              Create your account
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Join StoreReview and start rating stores
            </p>

          </div>


          {/* ==================================
              Card
          ================================== */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">


            {/* Error */}
            {error && (
              <div
                role="alert"
                className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
              >
                <div className="flex items-start gap-2">
                  <span>⚠️</span>
                  <p>{error}</p>
                </div>
              </div>
            )}


            {/* Success */}
            {success && (
              <div
                role="status"
                className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600"
              >
                <div className="flex items-start gap-2">
                  <span>✓</span>
                  <p>{success}</p>
                </div>
              </div>
            )}


            {/* =================================
                Form
            ================================= */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >


              {/* Name */}
              <div>

                <label
                  htmlFor="register-name"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Full Name
                </label>

                <input
                  id="register-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  minLength={20}
                  maxLength={60}
                  required
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                />

                <div className="mt-1 flex justify-end">
                  <span className="text-xs text-slate-400">
                    {formData.name.length}/60
                  </span>
                </div>

              </div>


              {/* Email */}
              <div>

                <label
                  htmlFor="register-email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email address
                </label>

                <input
                  id="register-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                />

              </div>


              {/* Address */}
              <div>

                <label
                  htmlFor="register-address"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Address
                </label>

                <textarea
                  id="register-address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  autoComplete="street-address"
                  maxLength={400}
                  rows={4}
                  required
                  disabled={loading}
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                />

                <div className="mt-1 flex justify-end">
                  <span className="text-xs text-slate-400">
                    {formData.address.length}/400
                  </span>
                </div>

              </div>


              {/* Password */}
              <div>

                <label
                  htmlFor="register-password"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Password
                </label>

                <div className="relative">

                  <input
                    id="register-password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                    minLength={8}
                    maxLength={16}
                    required
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-20 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (previous) => !previous
                      )
                    }
                    disabled={loading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
                  >
                    {showPassword
                      ? "Hide"
                      : "Show"}
                  </button>

                </div>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  8–16 characters with at least one
                  uppercase letter and one special character.
                </p>

              </div>


              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}

              </button>

            </form>


            {/* =================================
                Login
            ================================= */}

            <div className="mt-6 border-t border-slate-100 pt-6 text-center">

              <p className="text-sm text-slate-500">
                Already have an account?
              </p>

              <Link
                to="/login"
                className="mt-2 inline-block text-sm font-semibold text-blue-600 transition hover:text-blue-700"
              >
                Sign in →
              </Link>

            </div>

          </div>


          {/* Footer */}
          <p className="mt-6 text-center text-xs text-slate-400">
            StoreReview · Secure Store Rating Platform
          </p>

        </div>

      </main>

    </div>
  );
};


export default Register;