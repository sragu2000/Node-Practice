const express = require('express');
const app = express(); //call as a function

app.get("/hello",(res,req)=>{
    res.send("Hello World!");
});
//req, res order is important
app.get("/",(req,res)=>{
    res.send("This is Root");
});
// if there is no line here, Node Server will not run forever
app.listen(1337,()=>{
    console.log("Node Server running on port 1337");
})