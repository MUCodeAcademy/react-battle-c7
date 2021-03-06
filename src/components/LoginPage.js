import React, { useEffect, useState, useContext } from "react";
import { Card, Form, Button, Container } from "react-bootstrap";
import { UserContext } from "../shared/context/UserContext";
import { Link } from "react-router-dom";

function LoginPage() {
  const { login, message, setMessage } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    return setMessage("");
  }, []);

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
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
                Water Wars
                <br />
                <br />
                LOG IN
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
                        username.length > 0 &&
                        password.length > 0
                      ) {
                        setError("");
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
                        username.length > 0 &&
                        password.length > 0
                      ) {
                        setError("");
                      }
                    }}
                    value={password}
                  />
                </Form.Group>
<div className ="space"></div>
                {error && <div style={{ color: "red" }}>{error}</div>}
                {/* {message && <div>{message}</div>} */}
                <div className="w-100 text-center mt-3">
                  <Button
                    className="w-100 mt-5"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      if (
                        username &&
                        password &&
                        username.length > 4 &&
                        username.length < 21 &&
                        password.length > 4 &&
                        password.length < 21
                      ) {
                        setError(null);
                        login(username, password);
                      } else {
                        setError("Invalid login credentials");
                      }
                      if (message && message !== "Success") {
                        setError("Invalid login credentials");
                      }
                    }}
                  >
                    Login
                  </Button>
                </div>

              </Form>
            </Card.Body>
          </Card>

          <div className="tagMess w-100">
            Need to Create an account? <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
export default LoginPage;
