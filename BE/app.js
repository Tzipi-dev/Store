const express=require("express")
const app=express()
require("dotenv").config()
const cors=require("cors")
const DBconnection=require('./config/DBconnect')
DBconnection()
app.listen( () => {
  console.log(`app in running at port ${process.env.PORT}`);
});