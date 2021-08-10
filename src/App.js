import React from "react";
import useAxios from "./shared/hooks/useAxios";

function App() {
  const { callAPI: postCall} = useAxios("POST")
  return <div><button onClick={ async ()=>{
    let res = await postCall("/api/users/signup", {username: "test123", password: "password"})
    console.log(res);
  }}>Post</button></div>;
}

export default App;
