import React from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { isAuthenticated, signout } from "../authentication/helper/Index";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <ul className="nav nav-tabs ">
        <li className="nav-item">
          <NavLink
            to="/"
            className="nav-link"
            style={({ isActive }) => ({
              color: isActive ? "green" : "#FFFFFF",
              background: "none",
            })}
          >
            HOME
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/cart"
            className="nav-link"
            style={({ isActive }) => ({
              color: isActive ? "green" : "#FFFFFF",
              background: "none",
            })}
          >
            Cart
          </NavLink>
        </li>

        {isAuthenticated() && (
          <li className="nav-item">
            <NavLink
              to="/admin/dashboard"
              style={({ isActive }) => ({
                color: isActive ? "green" : "#FFFFFF",
                background: "none",
              })}
              className="nav-link"
            >
              Admin Dashboard
            </NavLink>
          </li>
        )}

        {!isAuthenticated() && (
          <>
            <li className="nav-item">
              <NavLink
                to="/signUp"
                style={({ isActive }) => ({
                  color: isActive ? "green" : "#FFFFFF",
                  background: "none",
                })}
                className="nav-link"
              >
                Sign Up
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/signIn"
                style={({ isActive }) => ({
                  color: isActive ? "green" : "#FFFFFF",
                  background: "none",
                })}
                className="nav-link"
              >
                Sign In
              </NavLink>
            </li>
          </>
        )}
        {isAuthenticated() && (
          <li className="nav-item">
            <span
              onClick={() => {
                signout(() => {
                  navigate("/");
                });
              }}
              className="nav-link text-warning"
            >
              Sign Out
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
