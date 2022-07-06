import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
      <img
        style={{ width: 120, marginTop: 5, opacity: 1 }}
        src="./Boston-PressRelease.png"
        alt="logo"
      />
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="http://localhost:3000/">
              Home <span className="sr-only"></span>
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="https://www.bostonindia.in/">Contact Us</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;