import React from "react";
import "./styles.css";
import logo from "../../assets/logo.png";
import { Link,useNavigate } from "react-router-dom";
function Navbar() {
  let history = useNavigate("/");
  function handleLogout(){
    localStorage.removeItem('token',null);
    history('/login');
  }
  const [toggleButton, setToggleButton] = React.useState(false);
  return (
    <>
      <nav className="navbar d-flex">
        <div className="navbar-container d-flex">
          <div className="logo">
            <img src={logo} alt="" />
            <span> rypto-Bazaar</span>
          </div>
          <div
            className="toggle-button"
            onClick={() => {
              setToggleButton(!toggleButton);
            }}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
          <div
            className={toggleButton ? "navbar-links active" : "navbar-links"}
          >
            <ul>
              <li>
                <Link to="/" className="menuLink">
                  <span className="text">Home</span>
                </Link>
              </li>
              {!localStorage.getItem("token") && (
                <li>
                  <Link to="/login" className="menuLink">
                    <span className="text">My Portfolio</span>
                  </Link>
                </li>
              )}
              {!localStorage.getItem("token") && (
                <li>
                  <Link to="/login" className="menuLink">
                    <span className="text">Login</span>
                  </Link>
                </li>
              )}
              {!localStorage.getItem("token") && (
                <li>
                  <Link to="/signup" className="menuLink">
                    <span className="text">Signup</span>
                  </Link>
                </li>
              )}
              {localStorage.getItem("token") && (
                <li>
                  <Link to="/My-portfolio" className="menuLink">
                    <span className="text">My Portfolio</span>
                  </Link>
                </li>
              )}
              {localStorage.getItem("token") && (
                <li>
                    <span className="text" onClick={handleLogout}>Logout</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
