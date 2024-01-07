import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id:{type:String,required:true},
    username:{type:String,required:true},
    image:String,
    bio:String,
    threads:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Threads'
        }
    ],
    onBoard:{
        type:Boolean,
        default:false,
    },communities:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Community'
    }]
});

const User = mongoose.models.User || mongoose.model('User',userSchema); //At first the mongoose schema will not exist  so will use userSchema but second time it waill use the User

export default User;