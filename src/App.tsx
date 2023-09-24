import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import * as AuthService from "./services/auth.service";
import IUser from './models/IUser';

import SignInPage from "./pages/authentication/SignIn";
import SignUpPage from "./pages/authentication/SignUp";
// import HomePage from "./pages/Home";
import UserPage from "./pages/User";
import AdminsPage from "./pages/management/AdminsPage";

import EventBus from "./common/eventBus";
import OperatorEmployeesPage from "./pages/management/OperatorEmployeesPage";
import GsmCardsPage from "./pages/management/GsmCardsPage";
import VoipCardsPage from "./pages/management/VoipCardsPage";
import EmployeesPage from "./pages/management/EmployeesPage";
import SubscriptionsPage from "./pages/management/SubscriptionsPage";

const App: React.FC = () => {
  const [showOperatorEmployeeBoard, setShowOperatorEmployeeBoard] = useState<boolean>(false);
  const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowOperatorEmployeeBoard(user.roles.includes("ROLE_OPERATOREMPLOYEE"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", logOut);

    return () => {
      EventBus.remove("logout", logOut);
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowOperatorEmployeeBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-brand">
          GSM Management
        </div>
        <div className="navbar-nav mr-auto">
          {showAdminBoard && (
            <li className="d-flex nav-item">
              <Link to={"/admin"} className="nav-link">
                Admins
              </Link>
              <Link to={"/operatorEmployees"} className="nav-link">
                Operator Employees
              </Link>
              <Link to={"/gsmCards"} className="nav-link">
                GSM Cards
              </Link>
              <Link to={"/voipCards"} className="nav-link">
                VOIP Cards
              </Link>
              <Link to={"/subscriptions"} className="nav-link">
                Subscriptions
              </Link>
              <Link to={"/employees"} className="nav-link">
                Employees
              </Link>
            </li>
          )}
          {showOperatorEmployeeBoard && (
            <li className="d-flex nav-item">
              <Link to={"/gsmCards"} className="nav-link">
                GSM Cards
              </Link>
              <Link to={"/voipCards"} className="nav-link">
                VOIP Cards
              </Link>
              <Link to={"/subscriptions"} className="nav-link">
                Subscriptions
              </Link>
              <Link to={"/employees"} className="nav-link">
                Employees
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/signIn" className="nav-link" onClick={logOut}>
                Log Out
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/signIn"} className="nav-link">
                Sign In
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/signUp"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="mt-3">
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/home" element={<UserPage />} />
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/admin" element={<AdminsPage />} />
          <Route path="/operatorEmployees" element={<OperatorEmployeesPage />} />
          <Route path="/gsmCards" element={<GsmCardsPage />} />
          <Route path="/voipCards" element={<VoipCardsPage />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/subscriptions" element={<SubscriptionsPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;