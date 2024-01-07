import mongoose from 'mongoose';
let isConnected = false;

export const connectToDB = async () =>{
    mongoose.set('strictQuery',true); //prevent unknown field query
    if(!process.env.MONGODB_URL) return console.log("URL Not found");
    if(isConnected) return console.log("Already connected");
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        isConnected = true;
        console.log("Connected to mongoose");
    } catch (error) {
        console.log(error);
    }


}