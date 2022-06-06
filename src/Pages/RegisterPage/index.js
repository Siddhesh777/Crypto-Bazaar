import React, { useState } from "react";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import { AiFillPhone } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar, Footer } from "../../Components";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [contactNo, setContactNo] = useState("");

  let history = useNavigate("/");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
    } else if (!contactNo) {
      toast.error("Please enter your contact number");
    } else if (!password) {
      toast.error("Please provide your password");
    } else if (password !== confirmPassword) {
      toast.error("Passwords didn't match");
    } else {
      const response = await fetch("http://localhost:5000/registerUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          contactNo: contactNo,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (json === false) {
        toast.warning("User with this email already exists !");
      } else {
        localStorage.setItem("token", json.token);
        toast.success("Registration Successfull !");
        history("/");
      }
    }
  };
  return (
    <div>
      <Navbar />
      <div className="Sform">
        <form className="signup_form" onSubmit={handleSubmit}>
          <h1 className="signup_heading">Registration</h1>
          <div className="signup_input_element">
            <BsPersonFill />
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              autoComplete="on"
            />
          </div>
          <div className="signup_input_element">
            <MdEmail />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="on"
            />
          </div>
          <div className="signup_input_element">
            <AiFillPhone />
            <input
              type="text"
              name="contactNo"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              placeholder="Contact number"
              autoComplete="on"
            />
          </div>

          <div className="signup_input_element">
            <FaLock />
            <input
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
            />
            <div onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
              {isPasswordVisible ? (
                <FaEye size={20} />
              ) : (
                <FaEyeSlash size={20} />
              )}
            </div>
          </div>
          <div className="signup_input_element">
            <FaLock />
            <input
              type={isConfirmPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              placeholder="Confirm password"
            />
            <div
              onClick={() =>
                setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
              }
            >
              {isConfirmPasswordVisible ? (
                <FaEye size={20} />
              ) : (
                <FaEyeSlash size={20} />
              )}
            </div>
          </div>
          <div className="signup_links">
            <Link to="/login" style={{ textDecoration: "none" }}>
              Already registered?
            </Link>
          </div>

          <button type="submit">Register</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;
