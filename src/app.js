const express = require('express');

const app = express();
app.use( "/test",(req , res) => {
    res.send("hello from server!");
});
app.use( "/hello",(req , res) => {
    res.send("hello from hello HELLO!");
});


app.listen(3000 , () => {
    console.log("server is successfully listening on port 3000");
});