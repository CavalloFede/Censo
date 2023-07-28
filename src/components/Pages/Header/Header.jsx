import React from 'react';
import logo from './logo.svg';
import './Header.css';
import LogoutButton from './LogoutButton';

const Header = () => {
  return (
    <header className="App-header">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a className="navbar-brand" href="#/test">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt=""
            />
            Censo-app
          </a>
          <LogoutButton />
        </div>
      </nav>
    </header>
  );
};

export default Header;
