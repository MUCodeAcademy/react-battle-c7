import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { UserContext } from "./context";
import "./App.css";
import ProtectedRoute from "./shared/ProtectedRoute";
import LoginPage from "./components/LoginPage"
import SignupPage from "./components/SignupPage"
import GamePage from "./components/GamePage"

function App() {
const { username, logout } = useContext(UserContext);

return (
  <Router>

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

        <Route path="*">
          <Redirect to="/login" />
        </Route>

      </Switch>
    </main>
  </Router>
);
}

export default App;
