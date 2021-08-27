import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import http from "../http-common";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [username, setUsername] = useState("");
  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();
  async function register(e) {
    e.preventDefault();
    try {
      const registerData = {
        email: email,
        password: password,
        confirmPassword: passwordVerify,
        username: username,
      };
      const newUser = await http.post("/auth/register", registerData);
      getLoggedIn();
      history.push("/");
    } catch (err) {
      alert(err.response.data.errorMessage);
    }
  }
  return (
    <div>
      <h1>Register a new account</h1>
      <form onSubmit={register}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input
          type="password"
          placeholder="Verify Your Password"
          onChange={(e) => setPasswordVerify(e.target.value)}
          value={passwordVerify}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
