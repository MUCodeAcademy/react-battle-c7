import React, { useState, useContext } from "react";
import { Card, Form, Button, Container } from "react-bootstrap";
import { UserContext } from "../shared/context/UserContext"
import { Link } from "react-router-dom";

function SignupPage() {
  const { signup } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);
  const [error2, setError2] = useState(null);

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div
          className=" justify-content-center"
          style={{ maxWidth: "400px" }}
        ></div>
        <div>
          <Card>
            <Card.Body
              style={{
                backgroundColor: "lightgray",
                boxShadow: "4px 4px 5px darkgray",
                minWidth: "350px",
              }}
            >
              <h2 className="mt-2 text-center">
                Lucky 7<br />
                Battleship
                <br />
                <br />
                Sign Up
              </h2>
              <Form>
                <Form.Group id="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    input
                    id="username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                  />
                </Form.Group>

                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </Form.Group>

                <Form.Group id="password2">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    input
                    type="password"
                    onChange={(e) => setPassword2(e.target.value)}
                    value={password2}
                  />
                </Form.Group>

                {error && <div>{error}</div>}
                {error2 && <div>{error2}</div>}

                <div className="w-100 text-center mt-3">
                  <Button
                    className="w-100 mt-5"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      setError(null);
                      setError2(null);
                      if (password !== password2) {
                        setError("Passwords do not match");
                      } else if (
                        username &&
                        password &&
                        username.length > 5 &&
                        password.length > 5 &&
                        username.length <= 20 &&
                        password.length <= 20
                      ) {
                        signup(username, password);
                      } else {
                        setError2(
                          "Username and password must be between 5 and 20 characters."
                        );
                      }
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          <div id="remove">Future link to log in page</div>
           <div className="tagMess w-100">
            Need to Create an account? <Link to="/Loginpage">Login</Link>
          </div> 
        </div>
      </Container>
    </>
  );
}
export default SignupPage;
