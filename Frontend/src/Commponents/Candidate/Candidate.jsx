import React, { useEffect, useRef, useState } from "react";
import "./Candidate.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Candidate = (props) => {
  const navigate = useNavigate();
  async function onvote() {
    {
      props.handleVoteCandidate(props.id)};
    }
  const viewCandidate = (id) => {
    navigate(`/candidate/${id}`);
  };

  return (
    <div className="candidate">
      <div className="detailcontainer">
        <div className="imgcontainer">
          <img src={props.imgUrl} alt="" />
        </div>
        <p>Name: {props.name}</p>
        <p>Username: {props.username}</p>
        <p>Email: {props.email}</p>
        <p>Party: {props.party}</p>
        <p>Manifesto: {props.manifesto}</p>
        <p>Age: {props.age}</p>
        <p>Good Deed: {props.gooddeed}</p>
        <p>Slogan: {props.slogan}</p>
      </div>
      <div className="buttonContainer">
        
        {console.log(props.isVoted)}
        { !props.isVoted && props.user=='Voter' &&  (
          <button onClick={onvote}>Vote Candidate</button>
        )}

        <button
          onClick={() => {
            viewCandidate(props.id);
          }}
        >
          View Candidate
        </button>
      </div>
    </div>
  );
};

export default Candidate;