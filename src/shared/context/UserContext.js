import React, { useState, createContext, useCallback } from "react";
import useAxios from "../hooks/useAxios";

export const UserContext = createContext(null);

export function UserProvider(props) {
  const [username, setUsername] = useState("");

  const { callAPI: loginCall } = useAxios("POST");
  const { callAPI: signupCall } = useAxios("POST");

  const login = useCallback((username, password) => {
    async function fetchData() {
      const res = await loginCall("/api/users/login", { username, password });
      if (res.data.success === true) {
        setUsername(username);
        console.log("Success");
      } else if (res.data.error) {
        console.log(res.data.error);
      }
    }
    return fetchData();
  }, []);

  const signup = useCallback((username, password) => {
    async function fetchData() {
      const res = await signupCall("/api/users/signup", { username, password });
      console.log(res.data);
      if (res.data.success === true) {
        setUsername(username);
        console.log("success");
      } else if (res.data.error) {
        console.log(res.data.error);
      }
    }
    return fetchData();
  }, []);

  const logout = useCallback(() => {
    setUsername("");
  },[])

  return (
    <UserContext.Provider value={{ login, signup, username, logout }}>
      {props.children}
    </UserContext.Provider>
  );
}
