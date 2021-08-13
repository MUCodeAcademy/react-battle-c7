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
                LOG IN
              </h2>
              <Form>
                <Form.Group id="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    id="username"
                    onChange={(e) => setUsername(e.target.value)}
                    onBlur={() => {if(username && password && username.length > 0 && password.length > 0) {
                      setError("");
                    }}}
                    value={username}
                  />
                </Form.Group>

                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => {if (username && password && username.length > 0 && password.length > 0) {
                      setError("");
                    }}}
                    value={password}
                  />
                </Form.Group>

                {error && (
                  <div style={{ color: "red" }}>
                    {error}
                  </div>
                )}
                {message && <div>{message}</div>}
                <div className="w-100 text-center mt-3">
                  <Button
                    className="w-100 mt-5"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      if (username && password && username.length > 0 && password.length > 0) {
                        setError(null);
                        login(username, password);
                      } else {
                        setError("Must enter a username and password");
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
