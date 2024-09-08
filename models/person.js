const mongoose=require('mongoose');

 const personschema=new mongoose.Schema({
      name:{
        type:String,
        required:true
      },
      age:{
        type:Number,
        required:true
      },
      work:{
        type:String,
        enum:["kaal","iternal"]
      }
})

// create model with this schema

const persons=mongoose.model('person',personschema);
module.exports=persons;