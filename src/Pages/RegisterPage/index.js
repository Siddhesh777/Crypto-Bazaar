import React from 'react';
import {Link} from "react-router-dom";
import { Navbar } from "../../Components";
import { MdEmail } from "react-icons/md";
import {RiLockPasswordFill} from "react-icons/ri";

function Signup() {
  return (
    <>
    <Navbar/>
    <div className="loginform">
    <h1>Log In</h1>
    <form>
    <div>
        <MdEmail/>
        <input type="email" placeholder="Email"/>
        </div>
        <div>
        <RiLockPasswordFill/>
        <input type="password" placeholder="Password"/>
        </div>
        <input type="submit" value="Log In"/>
        <Link to="/signup">register?</Link>
    </form>
    </div>
      
    </>
  )
}

export default Signup