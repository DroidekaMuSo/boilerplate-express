let express = require('express');
let bodyParser = require('body-parser')
let app = express();
require('dotenv').config()



app.use('/public',express.static(__dirname+"/public"))
app.use(function(req,res,next){
    console.log(`${req.method} / ${req.path} - ${req.ip}`)
    next()
})
app.use(bodyParser.urlencoded({extended:false}))

app.get("/", function(req,res){
    res.sendFile(__dirname+'/views/index.html')
}
)

app.get("/json", function(req,res){
    const message = process.env.MESSAGE_STYLE

    if(message==='uppercase'){
        res.json({
            "message":"HELLO JSON"
        })
    }else{
        res.json({
            "message":"Hello json"
        })
    }
})

app.get("/now",(req,res,next)=>{
    req.time = new Date().toString()
    next()
},(req,res)=>{
    res.json({
        time: req.time
    })
})

app.get("/:word/echo",(req,res)=>{
    res.json({
        "echo": req.params.word
    })
})

app.get("/name",(req,res)=>{
    const first = req.query.first
    const last = req.query.last

    res.json({
        "name":`${first} ${last}`
    })
})

app.post("/name",(req,res)=>{
    const {first,last} = req.body

    res.json({
        "name":`${first} ${last}`
    })
})







































 module.exports = app;
