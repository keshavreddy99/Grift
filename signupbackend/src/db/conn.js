const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/griftsignup").then(() => {
  console.log("db connection successful!");
}).catch((e)=>{
  console.log("no connection to db");
})


