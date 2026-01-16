import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../utils/auth";
import { motion } from "framer-motion";

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
    <section className="register">
      <motion.div
        className="container register_container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Sign In </h2>
        <form onSubmit={handleSubmit}>
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
            placeholder="password"
            onChange={changeInputHandler}
            autoComplete="true"
          />

          <p>
            Don't have an account ? <Link to="/register">Sign Up </Link>
          </p>
          <button type="submit" className="btn primary">
            Login
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default Login;
