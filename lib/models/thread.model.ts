import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
text:{type:String,required:true},
author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
},
community:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Community'
},
createdAt:{
    type:Date,
    default:Date.now
},
parentId:{
    type:String,
},
children:[{//Just like a tweet can have another tweet this thread can have another thread
    type:mongoose.Schema.Types.ObjectId,
    ref:'Thread'
}]
});

const Thread = mongoose.models.Thread || mongoose.model('Thread',threadSchema); //At first the mongoose schema will not exist  so will use userSchema but second time it waill use the User

export default Thread;