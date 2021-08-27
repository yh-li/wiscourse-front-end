import React, { createContext, useEffect, useState } from "react";
import http from "../http-common";
const AuthContext = createContext();
function AuthContextProvider(props) {
  //const [loggedIn, setLoggedIn] = useState(undefined);
  //const [loggedInUser, setLoggedInUser] = useState(undefined);
  const [loggedInUsername, setLoggedInUsername] = useState(undefined);
  async function getLoggedIn() {
    const loggedInRes = await http.get("/auth/loggedIn");
    //setLoggedIn(loggedInRes.data.loggedIn);
    //setLoggedInUser(loggedInRes.data.loggedInUser);
    setLoggedInUsername(loggedInRes.data.loggedInUsername);
  }

  useEffect(() => {
    getLoggedIn();
  }, []);
  return (
    <AuthContext.Provider value={{ loggedInUsername, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
