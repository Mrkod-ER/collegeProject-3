const express= require("express");
const path = require("path");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const app= express();
mongoose.connect("mongodb+srv://rohitgurjarkhari:N1l6WJ6fVA1G5utA@userdata.g0d0lxb.mongodb.net/?retryWrites=true&w=majority&appName=userdata");
const User = require("./users")


app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/",(req,res)=>{
    res.render("signup");
})

app.post("/", async(req,res)=>{
    let data = req.body;
    console.log(data);
    const auth = await User.findOne({name : req.body.name});
    console.log(auth);
    if(!auth){
    let result = await User.insertMany(data);
    console.log("connected");
    console.log(result);
    res.redirect("/login");
    }
    else{
        res.status(404).json({ error: "username already exists" });
    }
})

app.get("/login",(req,res)=>{
    res.render("login");
});

app.post("/login", async(req,res)=>{
    const check = await User.findOne({name: req.body.name });
    const name = req.body.name; 
    if(!check){
        res.send("User name cannot found");
    }
    else if(req.body.password != check.password){
        res.send("wrong Password");
    }
    else{
        res.redirect(`/status/${name}`); 
    }
})

app.get("/test",(req,res)=>{
    res.render("test");
})

app.post("/test",async(req,res)=>{
    const find = await User.findOne({name: req.body.name});
    const data = req.body;
    const ans = find.date;
    const name = req.body.name; 
    if(!ans){
    const result = await User.updateOne({
        name: req.body.name
    }, {
        $set: {
            date: req.body.date,
            startTime: req.body.startTime,
            endTime:req.body.endTime,
        }
    })
}    
else{
    const result = await User.insertMany(data);
}
   res.redirect(`/status/${name}`);
})

app.get('/status/:name', async (req,res)=>{
    let username = req.params.name
    const alldata = await User.find({
        name: username,
    });
        res.render('status',{record: alldata})
});

app.post("/status/:name",async(req,res)=>{
    const name = req.body.name;
    res.redirect(`/status/${name}`) 
})


app.listen(5000);
 