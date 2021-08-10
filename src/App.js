import React from 'react';
import { Container } from "react-bootstrap"
import LoginPage from "./components/LoginPage";

function App() {
  return(

  <Container className="d-flex align-items-center justify-content-center"
    style={{ minHeight: "100vh"}}>
    <div className=" justify-content-center" style={{ maxWidth: "400px"}}></div>

    <div><LoginPage />
    </div>


  </Container>

  )
}

export default App;
