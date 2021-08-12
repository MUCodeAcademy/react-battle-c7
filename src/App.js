import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { UserContext } from "./shared/context/UserContext";
import "./App.css";
import ProtectedRoute from "./shared/components/ProtectedRoute";
import LoginPage from "./components/LoginPage"
import SignupPage from "./components/SignupPage"
import WaitingRoom from "./components/WaitingRoom"
import GamePage from "./components/GamePage/GamePage"
import Navibar from "./components/Navibar";
import { Container } from "react-bootstrap";

function App() {
  const { logout } = useContext(UserContext);

  return (
    <Router>


      <>

        <Navibar />




        <NavLink
          to="/login"
          onClick={() => {
            logout();
          }}>
          Logout
        </NavLink>

        <main>
          <Switch>
            <ProtectedRoute path="/login" reqUser={false}>
              <LoginPage />
            </ProtectedRoute>

            <ProtectedRoute path="/signup" reqUser={false}>
              <SignupPage />
            </ProtectedRoute>

            <ProtectedRoute path="/game" reqUser={true}>
              <GamePage />
            </ProtectedRoute>

            <ProtectedRoute path="/waiting" reqUser={true}>
              <WaitingRoom />
            </ProtectedRoute>

            <Route path="*">
              <Redirect to="/login" />
            </Route>

          </Switch>
        </main>
      </>
     
    </Router >

  );
}

export default App;
