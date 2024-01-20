const express=require("express");
const http=require('http');
const {Server} =require('socket.io');
const cors=require('cors');

const app=express();
const server=http.createServer(app);
app.use(cors())
const io=new Server(server,{
    cors:{
        origin:'http://localhost:3000',
        methods:['GET','POST']
    }
})

io.on("connection",(socket)=>{
    console.log(`connected user ${socket.id}`);

    socket.on('message' ,(data)=>{
        socket.broadcast.emit('received_message',data)
    })
})

const PORT= process.env.PORT || 8000;

server.listen(PORT, ()=>{
    console.log(`listening on port${PORT}`)
})