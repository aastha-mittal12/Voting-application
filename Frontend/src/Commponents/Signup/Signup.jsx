import React, { useState, useRef, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";
import Qr from "../../assets/QR.jpg";
import Navbar from "../NavBar/Navbar";
const Signup = () => {
  let [action, setAction] = useState("Voter");
  let navigate = useNavigate();
  const emailRef = useRef();
  const passRef = useRef();
  const partyRef = useRef();
  const sloganRef = useRef();
  const deedRef = useRef();
  const usernameRef = useRef();
  const ageRef = useRef();
  const nameRef = useRef();
  const imgRef = useRef();
  const manifestoRef = useRef();

  function handleClick(e) {
    setAction(e.target.value);
  }

  async function submitform(e) {
    e.preventDefault();
    // let res = axios.post()
    let party, slogan, gooddeed, res, imgUrl, manifesto;
    let age = ageRef.current.value;
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passRef.current.value;
    let name = nameRef.current.value;
    let user = action;

    try {
      if (action === "Candidate") {
        party = partyRef.current.value;
        slogan = sloganRef.current.value;
        gooddeed = deedRef.current.value;
        manifesto = manifestoRef.current.value;
        imgUrl = imgRef.current.value;

        res = await axios.post("http://localhost:8080/candidatesignup", {
          name,
          email,
          password,
          age,
          party,
          slogan,
          gooddeed,
          username,
          manifesto,
          imgUrl,
          user,
        });
      } else {
        age = ageRef.current.value;
        res = await axios.post("http://localhost:8080/votersignup", {
          email,
          password,
          username,
          age,
          user,
          name,
        });
        console.log(res);
      }
      if (res.status === 200) {
        alert("Signed up successfully");
        navigate("/login");
      } else {
        alert("Error occurred during signup");
      }
    } catch (e) {
      console.log("error has occured");
    }
  }

  return (
    <Fragment>
      <Navbar />
      <div className="signup">
        <div className="choice">
          <h1> SIGNUP As? </h1>
          <div className="input">
            <label htmlFor="Candidate">Candidate</label>
            <input
              type="radio"
              name="Signup"
              id="Candidate"
              value="Candidate"
              onClick={handleClick}
            />
            <label htmlFor="Voter">Voter</label>
            <input
              type="radio"
              name="Signup"
              id="Voter"
              value="Voter"
              onClick={handleClick}
            />
          </div>
        </div>

        <form className='frm' action="" onSubmit={submitform}>
          <label htmlFor="name">NAME</label>
          <input
            type="text"
            id="name"
            placeholder="enter your name "
            ref={nameRef}
            required
          />

          <label htmlFor="username">USERNAME</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="enter your username"
            ref={usernameRef}
            required
          />

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
            placeholder="enter your password"
            ref={passRef}
            minLength={8}
            required
          />

          {action === "Candidate" ? (
            <>
              <label htmlFor="Party">Party</label>
              <input
                type="text"
                id="Party"
                placeholder="enter the name of party"
                ref={partyRef}
                required
              />

              <label htmlFor="slogan">Slogan</label>
              <input
                type="text"
                name="slogan"
                id="slogan"
                placeholder="Enter your Slogan"
                ref={sloganRef}
              />

              <label htmlFor="img">Image URL : </label>
              <input
                id="img"
                type="text"
                placeholder="URL of the Product"
                ref={imgRef}
              ></input>

              <label htmlFor="Age">Age</label>
              <input type="number" min={20} ref={ageRef} id="Age" required />

              <label htmlFor="manifesto">MANIFESTO</label>
              <input
                type="text"
                placeholder="Enter the manifesto"
                name="manifesto"
                ref={manifestoRef}
                required
              />

              <label htmlFor="gooddeed">Good deeds</label>
              <textarea
                name="gooddeed"
                id="gooddeed"
                cols="30"
                rows="5"
                placeholder="Enter your good deeds"
                ref={deedRef}
              ></textarea>
              <div className="payment">
                <label htmlFor="Fees">
                  Add your fees, Scan and pay : pay 50,000{" "}
                </label>
                <img src={Qr} alt="" />

                <label htmlFor="paymentScreenshot">
                  Upload your payment screenshot
                </label>
                <input
                  type="file"
                  id="paymentScreenshot"
                  name="paymentScreenshot"
                  accept="image/*"
                  required
                />
              </div>
            </>
          ) : (
            <>
              <label htmlFor="Age">Age</label>
              <input type="number" min={18} ref={ageRef} id="Age" required />
            </>
          )}

          <div className="btn signupbtn">
            <button>Signup</button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Signup;
