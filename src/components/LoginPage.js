import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
// import useAxios from "../shared/hooks/useAxios"
// import { useContext } from "../shared/context/UserContext";
// import { Link } from "react-router-dom";


function LoginPage() {
  // const { login } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);
// const { callAPI: axios } = useAxios("POST");

  return (
    <>
      <div>
        <Card >
          <Card.Body style={{backgroundColor: 'lightgray', boxShadow: '4px 4px 5px darkgray', minWidth: '350px'}}>

            <h2 className="mt-2 text-center">Lucky 7<br />Battleship<br /><br />LOG IN</h2>
            <Form > 
              <Form.Group id="username">
                <Form.Label>Username</Form.Label>
                <Form.Control input
                  id="username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}/>

              </Form.Group>

              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control input type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}/>
              </Form.Group>

              <Form.Group id="password2">
                <Form.Label>Confirm Password</Form.Label>
<Form.Control input type="password"                 
                  onChange={(e) => setPassword2(e.target.value)}
                  value={password2}/>
              </Form.Group>

              <div className="w-100 text-center mt-3">
                <Button
                  className="w-100 mt-5" type="submit"
                  onClick={(e) => {
                    e.preventDefault();
  if (!password===password2) {setError('Passwords do not match')
}

                          if (
              username.length > 4 &&
              password.length > 4 &&
              username.length <= 20 &&
              password.length <= 20
            ) {
              setError(null);
                      // history.push("/GamePage");
              //     let res = await axios.post("/api/users/login", {
              //   username,
              //   password,
              // });
              // if (res.error) {
              //   return setError(res.error);
              // }
              // login(res.data.username);
            }
          }}
        >
                  Login
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>

        <div id="remove">Future link to sign in page</div>
        {/* <div className="tagMess w-100">
            Need to Create an account? <Link to="/signup">Sign Up</Link>
          </div> */}
      </div>

    </>

  );
}
export default LoginPage;


