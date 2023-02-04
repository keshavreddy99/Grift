const mongoose = require("mongoose");

const userRecord = new mongoose.Schema({
  username: {
    type : String,
    required :true
  },
  email : {
    type: String,
    required : true,
    unique : true,
  },
  password :{
    type : String,
    required : true,
  },
  country : {
    type : String,
    required : true
  }
})

// create collection

const Register = new mongoose.model("Register", userRecord);

module.exports = Register;