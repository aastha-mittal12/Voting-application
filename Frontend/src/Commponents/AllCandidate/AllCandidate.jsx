import React, { useState, useEffect, Fragment } from "react";
import Candidate from "../Candidate/Candidate";
import axios from "axios";
import "./AllCandidate.css";
import Navbar from "../NavBar/Navbar";
import { jwtDecode } from "jwt-decode";

const AllCandidate = () => {
  const [candidates, setCandidates] = useState([]);
  const [decodedToken, setDecodedToken] = useState({});
  const [isVoted, setIsVoted] = useState(false);

  useEffect(() => {
    const getCandidates = async () => {
      try {
        let res = await axios.get("http://localhost:8080/allcandidate");
        setCandidates(res.data);
      } catch (e) {
        console.error("Error fetching candidates:", e);
      }
    };


    getCandidates();
  }, [candidates]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);
        setIsVoted(decoded.isvoted);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const handleVoteCandidate = async (id) => {
    try {
      let res = await axios.post("http://localhost:8080/voteCandidate", {
        candidateId: id,
        voterId: decodedToken._id,
      });

      // Update token in local storage
      localStorage.setItem("token", res.data.token);

      setDecodedToken(res.data.voter);
      setIsVoted(res.data.voter.isvoted);
    } catch (error) {
      console.error("Error voting for candidate:", error);
    }
  };

  return (
    <Fragment>
      <Navbar />
      <div className="maindiv">
        {candidates.map((candidate, index) => (
          <Candidate
            key={index}
            name={candidate.name}
            email={candidate.email}
            party={candidate.party}
            age={candidate.age}
            username={candidate.username}
            slogan={candidate.slogan}
            gooddeed={candidate.gooddeed}
            id={candidate._id}
            manifesto={candidate.manifesto}
            imgUrl={candidate.imgUrl}
            isVoted={isVoted}
            handleVoteCandidate={() => handleVoteCandidate(candidate._id)}
            user={decodedToken.user}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default AllCandidate;
