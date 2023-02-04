const express = require("express");
const app = express();
const path = require("path");
const port = process.env.port || 3000;
require("./db/conn")

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const Register = require("./models/registers");

const hbs = require("hbs");

const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");

const partials_path = path.join(__dirname, "../templates/partials");

// console.log(static_path);

// app.use(express.static(static_path)); 

app.set("view engine", "hbs");
app.set("views", templates_path );
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
  res.render("index");
})

app.get("/index.hbs", (req, res) => {
  res.render("index");
})

// create new user in db
app.post("/index.hbs", async(req, res) => {
  try{
    const registerUser = new Register({
      username : req.body.username,
      email : req.body.email,
      password : req.body.password,
      country : req.body.country
    })

    const registereduser = await registerUser.save();
    console.log("hi")
    res.status(201).render("login");

  }catch(e){
    console.log(e);
    res.status(400).send(e);
  }
})

app.get("/login.hbs", (req, res) => {
  res.render("login");
})

app.get("/myapp.hbs", (req, res) => {
  res.render("myapp");
})

app.post("/login.hbs", async(req, res) => {
  try{
    const email = req.body.email;
    const password = req.body.password;

    const useremail = await Register.findOne({email:email });
    
    if(useremail.password === password){
        // localStorage.clear();
        // const cn = useremail.country;
        // console.log(cn);
        // localStorage.setItem("country", cn);
        res.status(201).render("myapp")
    }
    else{
      res.send("invalid login details!");
    }
  }
  catch(e){
    res.status(400).send("invalid email!")
  }
})

app.listen(port, ()=> {
  console.log(`server running at port ${port}`);
})

