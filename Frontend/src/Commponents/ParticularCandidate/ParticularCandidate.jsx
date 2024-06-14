import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./ParticularCandidate.css";
import Navbar from "../NavBar/Navbar";
import { jwtDecode } from "jwt-decode";

const ParticularCandidate = () => {
  const [candidate, setCandidate] = useState({});
  const params = useParams();
  let navigate = useNavigate();

  const token = localStorage.getItem("token");
  let user = "";

  // Decode JWT and extract user role
  if (token) {
    const decodedToken = jwtDecode(token);
    user = decodedToken.user;
  }
  async function getCandidate() {
    try {
      const res = await axios.get(
        `http://localhost:8080/candidate/${params.id}`
      );
      setCandidate(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching candidate:", error);
    }
  }

  useEffect(() => {
    getCandidate();
  }, [params.id]);

  function editCandidate(id) {
    alert("Are you sure you want  to edit your profile");
    console.log({ id });
    navigate(`/candidate/edit/${id}`);
  }

  function voteCandidate(id) {
    alert("Are you sure you want to vote");
  }

  return (
    <div className="divp">
      <Navbar />
      <div className="particular-candidate-container">
        <div className="img-container">
          {candidate.imgUrl && (
            <img
              className="candidate-img"
              src={candidate.imgUrl}
              alt={`${candidate.username}'s Image`}
            />
          )}
        </div>
        <div className="candidate-box">
          <h1 className="particular-candidate-heading">{candidate.username}</h1>
          <h2 className="particular-candidate-detail party-color">
            Party: {candidate.party}
          </h2>
          <p className="particular-candidate-detail slogan-color">
            Slogan: {candidate.slogan}
          </p>
          <p className="particular-candidate-detail gooddeed-color">
            Good Deed: {candidate.gooddeed}
          </p>
          <p className="particular-candidate-detail">Age: {candidate.age}</p>
          <p className="particular-candidate-detail">
            Email: {candidate.email}
          </p>
        </div>
          
        {user === "Candidate" ? (
          <button onClick={() => editCandidate(candidate._id)}> Edit </button>
        ) : (
          <></>
        )}
        {/* {user==='Voter'? <button onClick={() => voteCandidate(candidate._id)}> Vote </button>: <></>} */}
      </div>
    </div>
  );
};

export default ParticularCandidate;
