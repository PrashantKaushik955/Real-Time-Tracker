const express = require("express");
const socketio = require("socket.io")
const http = require("http");
const path = require("path");

const app = express();

const server = http.createServer(app);

const io = socketio(server);

app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,"public")));

io.on("connection",function(socket){
    socket.on("send-location",function(data){
     io.emit("receive-location",{id:socket.id,...data});
    });

    socket.on("disconnect",function(){
        io.emit("user-disconnected",socket.id)
    })
})

app.get("/",(req,res)=>{
    res.render("index");
})

server.listen(9000,(err)=>{
    if(err) throw err;
    console.log("server running at port 9000");
    Console.log("Hello from server");
})