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
      if (res.response) {
        setUsername(username);
        return "Success"
      } else if (res.error) {
        return res.error;
      }
    }
    fetchData();
  }, []);

  const signup = useCallback((username, password) => {
    async function fetchData() {
      const res = await signupCall("/api/users/signup", { username, password });
      console.log(res.response);
      if (res.response) {
        setUsername(username);
        return "Success"
      } else if (res) {
        return res;
      }
    }
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ login, signup, username }}>
      {props.children}
    </UserContext.Provider>
  );
}
