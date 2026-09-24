import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected',()=>{
        console.log("DB Connected");
    })
    
   await mongoose.connect("mongodb+srv://Shanchika24:Miththa27@cluster1.hsjba.mongodb.net/e-commerce?retryWrites=true&w=majority&appName=Cluster1")
}

export default connectDB;