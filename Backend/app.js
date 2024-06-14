const express= require('express')
const app = express();
const Candidateroutes = require('./apis/Candidate')
const Voterroutes = require('./apis/Voter')
const cors = require('cors');


const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/signup')
.then(()=>{
    console.log("db connected")
})
.catch((err)=>{
    console.log("error occurred", {err})
})


app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(cors({ origin: ['http://localhost:5173'] }));
app.use(Candidateroutes);
app.use(Voterroutes);

app.get('/' , (req, res)=>{
    res.send('hello')
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server connected at port ${PORT}`);
});