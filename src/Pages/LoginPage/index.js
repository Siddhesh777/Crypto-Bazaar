import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Footer } from "../../Components";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import "./styles.css";

export default function Login() {
  return (
    <div className="loginPage">
      <Navbar />
      <div className="loginform">
        <h1>Log In</h1>
        <form>
          <div className="row">
            <div className="icon">
              <MdEmail />
            </div>
            <div>
              <input type="email" placeholder="Email" className="input" />
            </div>
          </div>
          <div className="row">
            <div className="icon">
              <RiLockPasswordFill />
            </div>
            <div>
              <input type="password" placeholder="Password" className="input" />
            </div>
          </div>
          <div>
            <input type="submit" value="Log In" className="submit" />
          </div>
          <div>
            <Link to="/signup">register?</Link>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
