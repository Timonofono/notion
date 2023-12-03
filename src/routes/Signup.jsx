import React, { useState } from "react";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../validation";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const [date, setDate] = useState(Date.now());

  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      const userData = User.parse({ email, password, date });
      if (password !== repeatPassword) {
        setErrors("Password mismatch");
        return;
      }
      const response = await fetch("http://localhost:5001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        navigate("/");
        setErrors(null);
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.format());
      }
    }
  };

  return (
    <div className="mt-4 pl-4 flex flex-col">
      <h1 className="text-3xl font-bold">Sign Up</h1>
      <input
        type="email"
        className="border-black-1 mt-4 w-1/3"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="border-black-1 mt-4 w-1/3"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        className="border-black-1 mt-4 w-1/3"
        placeholder="Repeat your password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
      />
      {errors && <div style={{ color: "red" }}>{errors}</div>}
      <button onClick={registerUser} className=" w-16 mt-4">Register</button>
      <Link to="/login" className="mt-4 w-1/3">You already have an account</Link>
    </div>
  );
}