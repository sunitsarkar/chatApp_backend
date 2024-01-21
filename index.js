const express=require("express");
const http=require('http');
const {Server} =require('socket.io');
const cors=require('cors');
const PORT= process.env.PORT || 8000;


const app=express();
const server=http.createServer(app);
app.use(cors())
const io=new Server(server,{
    cors:{
        origin:"https://chatapp-upbk.onrender.com",
        // origin:"http://localhost:3000",
        methods:['GET','POST']
    }
})

io.on("connection",(socket)=>{
    console.log(`connected user ${socket.id}`);

    socket.on("join_room", (data)=>{
        socket.join(data)
    })

    socket.on('message' ,(data)=>{
        socket.to(data.room).emit('received_message',data)
    })
})



server.listen(PORT, ()=>{
    console.log(`listening on port${PORT}`)
})