const express = require('express');
// const { urlencoded } = require('express');
const mongoose = require('mongoose');
const PORT=5656;
const app=express();
const cors=require('cors');
// const UserSchema=require('./db/UserSchema')

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());

//db setup
const db="mongodb://localhost:27017/Invoice";
const connectDB=async()=>{
    try{
        await mongoose.connect(db,{useNewUrlParser : true});
        console.log("MongoDb Connected");
    }
    catch(err){
        console.log(err.message);
    }
}
connectDB();

const postRoutes=require('./routes/postRoutes');
app.use("/api/posts",postRoutes)

app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`Work on ${PORT}`)
})