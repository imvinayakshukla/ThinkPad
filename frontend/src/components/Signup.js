import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Signup() {
  const host = "http://localhost:5000";
  let Navigate = useNavigate();
  const [cre, setcre] = useState({ name: "", email: "", password: "" });
  const handleClick = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: cre.name,
        email: cre.email,
        password: cre.password,
      }),
    });
    const json = await response.json();
    console.log(json)
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      Navigate("/login");
    } else {
      alert(json.error);
    }
  };
  const onChange = (e) => {
    setcre({ ...cre, [e.target.id]: e.target.value });
  };
  return (
    <div
    className="d-flex justify-content-center align-items-center vh-100"
    style={{ background: "#f0f2f5" }}
  >
    <div
      className="card p-4 shadow-lg"
      style={{ width: "400px", borderRadius: "15px" }}
    >
      <h3 className="text-center mb-4" style={{ color: "#0d6efd" }}>
        Sign Up
      </h3>
      <form className="mx-2" onSubmit={handleClick}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            onChange={onChange}
            value={cre.name}
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            onChange={onChange}
            value={cre.email}
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            onChange={onChange}
            value={cre.password}
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
          />
        </div>
  
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            onChange={onChange}
            value={cre.confirmPassword}
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirm your password"
          />
        </div>
  
        <button type="submit" className="btn btn-primary w-100">
          Sign Up
        </button>
  
        <div className="text-center mt-3">
          <small>
            Already have an account?{" "}
            <Link to="/login">
            <span  style={{ color: "#0d6efd" }}>
              Login
            </span>
            </Link>
          </small>
        </div>
      </form>
    </div>
  </div>
  
  );
}
