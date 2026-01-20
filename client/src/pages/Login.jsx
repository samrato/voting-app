import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../utils/auth";
import { motion } from "framer-motion";
import "./Login.css";

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();


  const changeInputHandler = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(userData.email, userData.password);
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <section className="login-page">
      <motion.div
        className="login-container"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Sign In</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <p className="form_error-message">{error}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email address"
            onChange={changeInputHandler}
            autoComplete="true"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={changeInputHandler}
            autoComplete="true"
          />

          <p>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default Login;
