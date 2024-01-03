import mongoose from 'mongoose';
let isConnected = false;
export const connectDB = async () =>{
    mongoose.set('strictQuery',true); //prevent unknown field query
    if(!process.env.MONGODB_URL) return console.log("URL Not found");
    if(isConnected) return console.log("Already connected");
    try {
        
    } catch (error) {
        
    }


}