import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      const res = await fetch(
        "https://voting-app-wgsv.onrender.com/api/voters/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Save token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.id);
      localStorage.setItem("isAdmin", data.isAdmin);

      navigate("/results"); // redirect after login
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <section className="register">
      <div className="container register_container">
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
      </div>
    </section>
  );
};

export default Login;
