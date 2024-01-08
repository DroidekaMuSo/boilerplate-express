let express = require('express');
let app = express();
require('dotenv').config()



app.use('/public',express.static(__dirname+"/public"))
app.use(function(req,res,next){
    console.log(`${req.method} / ${req.path} - ${req.ip}`)
    next()
})

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








































 module.exports = app;
