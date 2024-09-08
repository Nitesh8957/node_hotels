const mongoose=require('mongoose');

const lkd= new mongoose.Schema({
    itemname:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    }
})

const mkdd=mongoose.model('menu',lkd);
module.exports=mkdd;