import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import http from "../http-common";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();
  async function login(e) {
    e.preventDefault();
    try {
      const loginData = {
        email: email,
        password: password,
      };
      const LogInUser = await http.post("/auth/login", loginData);

      getLoggedIn();
      //console.log("Successfully logged in user ", loggedInUser);
      history.push("/");
    } catch (err) {
      console.error(err);
      console.log(err.response);
      alert(err.response);
    }
  }
  return (
    <div>
      <h1>Log In:</h1>
      <form onSubmit={login}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default Login;
