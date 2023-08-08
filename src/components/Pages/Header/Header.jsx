import React from "react";
import logo from "./logo.svg";
import "./Header.css";
import "bootstrap/dist/js/bootstrap.min.js";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="App-header">
      <nav className="navbar navbar-dark">
        <Link to="/dashboard">
          <img
            src={logo}
            width="50"
            height="30"
            className="d-inline-block align-top"
            alt=""
          />
        </Link>
        <LogoutButton />
      </nav>
    </header>
  );
};

export default Header;
