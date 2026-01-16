import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { motion } from "framer-motion";

const Register = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    password2: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const changeInputHandler = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api("/voters/register", "POST", userData);
      navigate("/"); // redirect to login
    } catch (err) {
      setError(err.message);
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
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="form_error-message">{error}</p>}

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            onChange={changeInputHandler}
            autoComplete="true"
            autoFocus
          />
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
          <input
            type="password"
            name="password2"
            placeholder="Confirm password"
            onChange={changeInputHandler}
            autoComplete="true"
          />
          <p>
            Already have an account? <Link to="/">Sign in</Link>
          </p>
          <button type="submit" className="btn primary">
            Register
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default Register;
