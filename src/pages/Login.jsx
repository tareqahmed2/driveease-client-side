import React, { useState } from "react";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Helmet } from "react-helmet";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signInUser, signInWithGoogle } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError("");

    signInUser(email, password, navigate)
      .then(() => navigate("/home"))
      .catch(() => setError("Failed to sign in. Please try again."));
  };

  const handleDemoLogin = () => {
    const demoEmail = "tareqahmed347396@gmail.com";
    const demoPassword = "tareq123";

    signInUser(demoEmail, demoPassword, navigate)
      .then(() => navigate("/home"))
      .catch(() => setError("Failed to sign in. Please try again."));
  };

  return (
    <div className="px-6 flex justify-center items-center my-10">
      <Helmet>
        <title>DriveEase | Login</title>
      </Helmet>

      <div className="card bg-base-100 w-full md:w-3/4 lg:w-3/6 shadow-xl max-w-2xl">
        <h2 className="text-2xl my-8 font-bold text-center text-primary">
          Login Now
        </h2>

        <form onSubmit={handleSubmit} className="card-body">
          {error && (
            <p className="text-error text-center font-medium">{error}</p>
          )}

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="password"
                className="input input-bordered w-full pr-10"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="form-control mt-6 gap-3">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="btn btn-secondary"
            >
              Demo Login
            </button>

            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>

          <button
            type="button"
            onClick={() => signInWithGoogle(navigate)}
            className="btn btn-outline mt-4 flex items-center gap-2"
          >
            <FaGoogle />
            Login With Google
          </button>
        </form>

        <div className="text-center pb-6">
          <p className="font-medium">
            Don't have an account?{" "}
            <Link to="/register" className="link link-primary">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
