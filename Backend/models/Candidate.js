const mongoose= require('mongoose')
let candidateSchema=  mongoose.Schema({
    name: { type: String, required: true },
    email:{type :String , unique :true}, 
    party:{type :String  , required:true},
    manifesto:{type :String,required:true,trim:true},
    age:{type :Number,required:true},
    username:{type:String,unique:true},
    password:{type :String,required:true},
    gooddeed:{type:String,required:true},
    imgUrl:{type:String},
    votes: { type: Number, default: 0 }, 
    slogan: {
        type:String,
        reuired:true
    },
    user:{
        type: String,
        required:true 
    }

}
    

)

let Candidate= mongoose.model('Candidate', candidateSchema)
module.exports = Candidate