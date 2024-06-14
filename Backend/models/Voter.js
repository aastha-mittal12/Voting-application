const  mongoose = require('mongoose');
let voterSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

   email:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true

    }, 

    username:{
        type:String , 
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    user:{
        type: String,
        required:true 
    },
    isvoted:{
        type:Boolean,
        default:false
    }
})

let Voter = mongoose.model('Voter', voterSchema);
module.exports= Voter;