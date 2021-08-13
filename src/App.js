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
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import WaitingRoom from "./components/WaitingRoom";
import GamePage from "./components/GamePage/GamePage";
import Navibar from "./components/Navibar";
import About from "./components/About";

function App() {
  const { logout } = useContext(UserContext);

  return (
    <Router>
      <>
        <Navibar />

        <main>
          <Switch>
            <ProtectedRoute path="/login" reqUser={false}>
              <LoginPage />
            </ProtectedRoute>

            <ProtectedRoute path="/signup" reqUser={false}>
              <SignupPage />
            </ProtectedRoute>

            <ProtectedRoute path="/waiting" reqUser={true}>
              <WaitingRoom />
            </ProtectedRoute>

            <Route path="/about">
              <About />
            </Route>

            <ProtectedRoute path="/gameroom" reqUser={true}>
              <GamePage />
            </ProtectedRoute>

            <Route path="*">
              <Redirect to="/login" />
            </Route>
          </Switch>
        </main>
      </>
    </Router>
  );
}

export default App;
