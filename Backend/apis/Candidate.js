const express = require('express')
const router = express.Router();
const Candidate = require('../models/Candidate')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const generateAuthToken= require('../generatewebtoken')


router.post('/candidatesignup',async (req,res)=>{
    let userm = req.body;
    let foundemail = await Candidate.findOne({email:userm.email});
    if(foundemail)
    {
        console.log("email is already registered")
        res.status(400).json({msg:"email is already registered"});
    }
    
    else {
            console.log(userm.password);
            userm.password = await bcrypt.hash(userm.password, saltRounds);
            console.log(userm.password,'bcrypt hash');
            let newCandidate = await Candidate.create({
                email: userm.email,
                password: userm.password,
                party: userm.party,
                slogan: userm.slogan,
                age: userm.age,
                gooddeed: userm.gooddeed,
                username:userm.username,
                name:userm.name,
                manifesto: userm.manifesto,
                imgUrl: userm.imgUrl,
                user:userm.user

            });
            console.log(userm.gooddeed);
            console.log(newCandidate);
            
            res.json({ msg: "Signed up successfully" });
      
    }
    
})

// login
router.post('/candidatelogin',async (req,res)=>{
    let user = req.body;
    console.log(user);
    let userinfo = await Candidate.findOne({email:user.email});
    console.log(userinfo);
    if(!userinfo)
    {
       return  res.status(404).json({msg:"User not found"});
    }
    else{
        let validatePass= await bcrypt.compare(user.password ,userinfo.password );
        if(!validatePass){
            console.log("passwordnot matched")
            return res.status(400).json({msg:"Incorrect Password"});
        }
        const token=generateAuthToken(userinfo);
        console.log(token)
        res.status(200).json({token , userinfo}  );
    }
})

//all candidates
router.get('/allcandidate', async(req,res)=>{
    try{
        let allcandidates= await Candidate.find({});
        res.status(200).json(allcandidates);
    }
    catch{
        res.status(400).json({msg:'erroroccurred while fetching the candidates'})
    }
   
})


// particular candidate
router.get('/candidate/:id' ,async (req, res)=>{
    console.log('hi');
  console.log(req.params)
    let {id} = req.params;
    console.log(id)
    try{
        let candidate = await Candidate.findById(id);
        res.status(200).json(candidate);
    }
    catch(e)
    {
        res.status(400).json({msg:"something went wrong"} )
        
    }
   
})

// edit candidate
router.put('/candidate/:id', async (req, res) => {
    const { id } = req.params;
    const updatedCandidateData = req.body;
    
    try {
      const updatedCandidate = await Candidate.findByIdAndUpdate(id, updatedCandidateData);
      console.log(updatedCandidate)
      
      if (!updatedCandidate) {
        return res.status(404).json({ msg: 'Candidate not found' });
      }
      res.status(200).json(updatedCandidate);
    } 
    catch (error) {
      console.error('Error updating candidate:', error);
      res.status(400).json({ msg: 'Error updating candidate' });
    }
  });


module.exports = router;