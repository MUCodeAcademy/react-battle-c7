import React, { useState, useContext, useEffect } from "react";
import { Card, Form, Button, Container } from "react-bootstrap";
import { UserContext } from "../shared/context/UserContext";
import { Link } from "react-router-dom";

function SignupPage() {
  const { signup, message, setMessage } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);
  const [error2, setError2] = useState(null);

  useEffect(() => {
    return setMessage("");
  }, []);

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        // style={{ minHeight: "100vh" }}
      >
        <div
          className=" justify-content-center"
          style={{ maxWidth: "300px" }}
        ></div>
        <div>
          <Card>
            <Card.Body
              style={{
                backgroundColor: "lightgray",
                boxShadow: "4px 4px 5px darkgray",
                width: "300px",
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
                    id="username"
                    placeholder="Must be 5 to 20 characters"
                    onChange={(e) => setUsername(e.target.value)}
                    onBlur={() => {
                      if (
                        username &&
                        password &&
                        username.length >= 5 &&
                        password.length >= 5 &&
                        username.length <= 20 &&
                        password.length <= 20
                      ) {
                        setError2("");
                      } else {
                        setError2(
                          "Username and password must be between 5 and 20 characters."
                        );
                      }
                    }}
                    value={username}
                  />
                </Form.Group>

                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Must be 5 to 20 characters"
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => {
                      if (
                        username &&
                        password &&
                        username.length >= 5 &&
                        password.length >= 5 &&
                        username.length <= 20 &&
                        password.length <= 20
                      ) {
                        setError2("");
                      } else {
                        setError2(
                          "Username and password must be between 5 and 20 characters."
                        );
                      }
                      if (password === password2) {
                        setError("");
                      } else {
                        setError("Passwords do not match");
                      }
                    }}
                    value={password}
                  />
                </Form.Group>

                <Form.Group id="password2">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Passwords must match"
                    onChange={(e) => setPassword2(e.target.value)}
                    onBlur={() => {
                      if (password === password2) {
                        setError("");
                      } else {
                        setError("Passwords do not match.");
                      }
                    }}
                    value={password2}
                  />
                </Form.Group>

                {error && <div style={{ color: "red" }}>{error}</div>}
                {error2 && <div style={{ color: "red" }}>{error2}</div>}
                {message && <div style={{ color: "red" }}>{message}</div>}

                <div className="w-100 text-center mt-3">
                  <Button
                    className="w-100 mt-5"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      setMessage("");
                      if (
                        username &&
                        password &&
                        username.length >= 5 &&
                        password.length >= 5 &&
                        username.length <= 20 &&
                        password.length <= 20 &&
                        password === password2
                      ) {
                        signup(username, password);
                      }
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          <div className="tagMess w-100">
            Need to Create an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
export default SignupPage;
