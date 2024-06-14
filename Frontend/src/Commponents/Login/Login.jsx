import React, { Fragment, useRef, useState } from "react";
import axios from "axios";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./../NavBar/Navbar";

const Login = () => {
  const [action, setAction] = useState("Voter");
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();


  const handleClick = (e) => {
    setAction(e.target.value);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      let res;
      if (action === "Candidate") {
        res = await axios.post("http://localhost:8080/candidatelogin", {
          email,
          password,
        });
      } else {
        res = await axios.post("http://localhost:8080/voterlogin", {
          email,
          password,
        });
      }

      console.log(res);

      if (res.status === 200) {
        alert("Logged in successfully");
        const token = res.data.token;
        // console.log(token);

        if (token) {
          localStorage.setItem("token", token);
        } else {
          console.log("Token is Not Generated");
        }
        if (action === "Candidate") {
          const candidateId = res.data.userinfo._id;
          console.log(candidateId);
          navigate(`/candidate/${candidateId}`);
        } else {
          const voterId = res.data.userinfo._id;
          console.log(voterId);
          navigate(`/voter/${voterId}`);
        }
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      alert(error);
    }
  };

  return (
    <Fragment>
      <Navbar />
      <div className="login">
        <div className="choice">
          <h1>Login As?</h1>
          <div className="input">
            <label htmlFor="Candidate">Candidate</label>
            <input
              type="radio"
              name="Login"
              id=""
              value="Candidate"
              onClick={handleClick}
            />

            <label htmlFor="Voter">Voter</label>
            <input
              type="radio"
              name="Login"
              id=""
              value="Voter"
              onClick={handleClick}
            />
          </div>
        </div>

        <form className="frm" onSubmit={submitForm}>
          <label htmlFor="email">EMAIL</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            ref={emailRef}
            required
          />

          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            minLength={8}
            ref={passwordRef}
            required
          />

          <button type="submit">Login</button>
          <p>Haven't Signed up?</p>
          <button><Link to="/signup">Signup</Link></button>
          
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
