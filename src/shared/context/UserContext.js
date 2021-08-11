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
        return "Success"
      } else if (res.data.error) {
        return res.data.error;
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
        return "Success"
      } else if (res.data.error) {
        return res.data.error;
      }
    }
    return fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ login, signup, username }}>
      {props.children}
    </UserContext.Provider>
  );
}
