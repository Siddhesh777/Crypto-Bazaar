import React, {useState } from "react";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom"
import {MdEmail} from "react-icons/md";
import {FaEye,FaEyeSlash,FaLock} from "react-icons/fa";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Navbar,Footer} from "../../Components";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  let history = useNavigate('/');

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
    } else if (!password) {
      toast.error("Please provide your password");
    } else {
      const response = await fetch('http://localhost:5000/loginUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email:email, password:password })
      });
      const json = await response.json();
      console.log(json)
      if (json === false) {
        toast.error("Invalid Credentials!!");
      } else {
        localStorage.setItem('token', json.token)
        toast.success("Login Successfull !");
        history('/')
      }
    }

  }
  return (
    <div>
    <Navbar/>
    <div className="Lform">
      <form className="login_form" onSubmit={handleSubmit}>
        <h1 className="login_heading">Login</h1>

        <div className="login_input_element">
          <MdEmail />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Email"
            autoComplete="on"
          />
        </div>

        <div className="login_input_element">
          <FaLock />
          <input
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            placeholder="Password"
          />
          <div onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
          {isPasswordVisible ? <FaEye size={20}/> : <FaEyeSlash size={20}/>}
        </div>
        </div>
        <div className="login_links">
          <Link to="/signup" style={{textDecoration:"none"}}>New account?</Link>
        </div>

        <button type="submit">Login</button>
        
      </form>
      </div>
      <Footer/>
    </div>
  );
}

export default Login;
