import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { UserContext } from "./shared/context";
import "./App.css";
import ProtectedRoute from "./shared/components/ProtectedRoute";
import LoginPage from "./components/LoginPage"
import SignupPage from "./components/SignupPage"
import WaitingRoom from "./components/WaitingRoom"
import GamePage from "./components/GamePage/GamePage"
import Navibar from "./components/Navibar";

function App() {
  const { username, logout } = useContext(UserContext);

  return (
    <Router>
      <div classname="container">
        <>
          <h3 className="m-3 d-flex justify-content-center">Lucky 7</h3><br />
          <h5 className="m-3 d-flex justify-content-center">Battleship</h5>
<Navibar/>

          <NavLink
            activeClassName="active"
            to="/loginpage">
            Login
          </NavLink>

          <NavLink
            activeClassName="active"
            to="/signuppage">
            Signup
          </NavLink>

          <NavLink
            activeClassName="active"
            to="/gamepage">
            GameBoard
          </NavLink>

          <NavLink
            activeClassName="active"
            to="/waitingroom">
            WaitingRoom
          </NavLink>

          <NavLink
            to="/login"
            onClick={() => {
              logout();
            }}>
            Logout
          </NavLink>

          <main>
            <Switch>
              <ProtectedRoute path="/loginpage" reqUser={false}>
                <LoginPage />
              </ProtectedRoute>

              <ProtectedRoute path="/signuppage" reqUser={false}>
                <SignupPage />
              </ProtectedRoute>

              <ProtectedRoute path="/gamepage" reqUser={true}>
                <GamePage />
              </ProtectedRoute>

              <ProtectedRoute path="/waitingroom" reqUser={true}>
                <WaitingRoom />
              </ProtectedRoute>

              <Route path="*">
                <Redirect to="/login" />
              </Route>

            </Switch>
          </main>
        </>
      </div>
    </Router>

  );
}

export default App;
