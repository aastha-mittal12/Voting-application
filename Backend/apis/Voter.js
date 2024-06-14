const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const generateAuthToken = require("../generatewebtoken");
const Voter = require("../models/Voter");
const Candidate = require("../models/Candidate");

router.post("/votersignup", async (req, res) => {
  let userm = req.body;
  console.log(userm);
  let foundemail = await Voter.findOne({ email: userm.email });
  if (foundemail) {
    console.log("email is already registered");
    res.status(400).json({ msg: "email is already registered" });
  } else {
    console.log(userm.password);
    userm.password = await bcrypt.hash(userm.password, saltRounds);
    console.log(userm.password, "bcrypt hash");
    let newVoter = await Voter.create({
      email: userm.email,
      password: userm.password,
      age: userm.age,
      username: userm.username,
      user: userm.user,
      name: userm.name,
    });
    //console.log(newVoter);

    res.json({ msg: "Signed up successfully" });
  }
});

// login
router.post("/voterlogin", async (req, res) => {
  let user = req.body;
  // console.log(user);
  let userinfo = await Voter.findOne({ email: user.email });
  console.log("userInfo:"+userinfo);
  if (!userinfo) {
    return res.status(404).json({ msg: "User not found" });
  } else {
    let validatePass = await bcrypt.compare(user.password, userinfo.password);
    if (!validatePass) {
      console.log("passwordnot matched");
      return res.status(400).json({ msg: "Incorrect Password" });
    }
    const token = generateAuthToken(userinfo);
    console.log(token);
    res.status(200).json({ token, userinfo });
  }
});

// show voter
router.get("/voter/:id", async (req, res) => {
  console.log("hi");
  console.log(req.params);
  let { id } = req.params;
  console.log(id);
  try {
    let voter = await Voter.findById(id);
    res.status(200).json(voter);
  } catch (e) {
    res.status(400).json({ msg: "something went wrong" });
  }
});

router.post("/voteCandidate", async (req, res) => {
// console.log("mai andr aa gya "+req)
  let { candidateId, voterId } = req.body;
  // console.log(candidateId +" "+ voterId);

  try {
    let candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ msg: "Candidate not found" });
    }
    // console.log(candidate);
    candidate.votes = candidate.votes + 1;
    // console.log("votes"+candidate.votes);
    // console.log(candidate);
    await candidate.save(); // Save the updated candidate votes

    let voter = await Voter.findById(voterId);
    if (!voter) {
      return res.status(404).json({ msg: "Voter not found" });
    }

    // console.log("my new voter"+voter); 
    voter.isvoted = true;
    await voter.save(); // Save the updated voter's voting status
    // console.log("updated voter"+voter); 
    // console.log(candidate);
    const token = generateAuthToken(voter);
    res.json({ voter, token });
   
  } catch (error) {
    console.error("Error voting for candidate:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = router;