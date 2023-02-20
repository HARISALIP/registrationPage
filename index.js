var express = require("express")
var bodyParser = require("body-parser")
const mongoose = require("mongoose");

const app =express()

app.use(bodyParser.json())
app.use(express.static("public"))
app.use(bodyParser.urlencoded({
    extended:true
}))

const dbURI = 'mongodb+srv://new-user:Dvo2LrE9lgo1ts3L@nodetuts.gfffxkp.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser : true, useUnifiedTopology: true})
mongoose.set('strictQuery', true);
// mongoose.connect("mongodb://127.0.0.1:27017/mydb"),{
//     useNewUrlParser:true,
//     useUnifiedTopology:true

// }

var db = mongoose.connection;
db.on("error",()=>console.log("Error in connecting to database"));
db.once("open",()=>console.log("connected to database"))

app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password =req.body.password;
    var subject =req.body.subject;
    var college =req.body.college;

    var data ={
        "name":name,
        "email":email,
        "phno": phno,
        "password": password,
        "subject": subject,
        "college":college
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("record inserted success fully");
    });

    return res.redirect("signup_succes.html")
})

app.get("/",(req,res)=>{
    res.send({
        "Allow-acces-ALLow-origine": '*'
    })
    return res.redirect("index.html")
}).listen(3000);

console.log("listening port 3000");