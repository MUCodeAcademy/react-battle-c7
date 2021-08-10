import React, { useState, createContext } from "react";
import useAxios from "../hooks/useAxios";

export const UserContext = createContext(null);

export function UserProvider(props) {
  const [username, setUsername] = useState("");

  const { callAPI: loginCall } = useAxios("GET");
  const { callAPI: signupCall } = useAxios("POST");

  const login = useCallback((username, password) => {
    async function fetchData() {
      const res = await loginCall("/api/users/login", { username, password });
      if (res.response.success) {
        setUsername(username);
      } else if (res.error) {
        return res.error;
      }
    }
    fetchData();
  }, []);

  const signup = useCallback((username, password) => {
    async function fetchData() {
      const res = await signupCall("/api/users/signup", { username, password });
      if (res.response.success) {
        setUsername(username);
      } else if (res.error) {
        return res.error;
      }
    }
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ login, signup }}>
      {props.children}
    </UserContext.Provider>
  );
}
