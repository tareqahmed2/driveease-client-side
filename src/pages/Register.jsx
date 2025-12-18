import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { Helmet } from "react-helmet";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signUp } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const name = form.name.value;
    const photo = form.photoURL.value;
    const password = form.password.value;

    if (!email || !name || !photo || !password) {
      setError("All fields are required!");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const validDomains = ["gmail.com", "yahoo.com"];
    const domain = email.split("@")[1];
    if (!validDomains.includes(domain)) {
      setError("Only Gmail or Yahoo email addresses are allowed.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setError("");
    signUp(email, password, name, photo, navigate);
  };

  return (
    <div className="flex justify-center items-center my-10 px-5">
      <Helmet>
        <title>DriveEase | Register</title>
      </Helmet>

      <div className="card bg-base-100 w-full md:w-3/4 lg:w-3/6 shadow-xl max-w-2xl">
        <h2 className="text-2xl my-8 font-bold text-center text-primary">
          Register Now
        </h2>

        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input input-bordered"
              required
            />
          </div>

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
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              name="photoURL"
              placeholder="Photo URL"
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

          {error && (
            <p className="text-error text-center font-medium mt-4">
              {error}
            </p>
          )}

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>

        <div className="text-center pb-6">
          <p className="font-medium">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
