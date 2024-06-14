import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../NavBar/Navbar";
import "./ParticularVoter.css"; // Import the CSS file

const ParticularVoter = () => {
  const [voter, setVoter] = useState({});
  const params = useParams();
  let navigate = useNavigate();

  const token = localStorage.getItem("token");
  let user = "";

  async function getVoter() {
    try {
      const res = await axios.get(`http://localhost:8080/voter/${params.id}`);
      setVoter(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching Voter:", error);
      alert("Error fetching Voter:", error);
    }
  }

  useEffect(() => {
    getVoter();
  }, [params.id]);

  return (
    <Fragment>
      <Navbar />
      <div className="div">
        
        <div className="particular-voter-container">
          <div className="voter-box">
            <div className="voter-info">
              <h1 className="particular-voter-heading">{voter.username}</h1>
              <div className="voter-details">
                <p className="particular-voter-detail gooddeed-color">
                  <strong>Name:</strong> {voter.name}
                </p>
                <p className="particular-voter-detail">
                  <strong>Age:</strong> {voter.age}
                </p>
                <p className="particular-voter-detail">
                  <strong>Email:</strong> {voter.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ParticularVoter;
