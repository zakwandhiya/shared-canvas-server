import express = require ("express")
import * as socketio from "socket.io"
import * as path from "path";
import {isRealCanvasData, isRealString} from "./validator"
import {Users} from "./users"
import {generateCanvasData} from "./canvas_data"


const app: express.Application = express();
app.set("port", process.env.PORT || 3000);

let http = require("http").Server(app);
// set up socket.io and bind it to our
// http server.
// let io = require("socket.io")(http);
let io: socketio.Server = socketio.listen(http)

app.get("/home", (req: any, res: any) => {
  res.sendFile(path.resolve("./client/index.html"));
});

app.get("/", (req: any, res: any) => {
  res.send("hi there");
});

var usersInstance = new Users();

io.on('connection', (socket) => {
  console.log(socket.id + " is connected")
  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }

    socket.join(params.room);
    usersInstance.removeUser(socket.id);
    usersInstance.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', usersInstance.getUserList(params.room));
    callback();
  });

  socket.on('createCanvasData', (rawCanvasData, callback) => {
    
    var user = usersInstance.getUser(socket.id);

    if (user !== null && user !== undefined && isRealCanvasData(rawCanvasData)) {
      socket.broadcast.to(user.room).emit('newCanvasData', generateCanvasData(user.id, rawCanvasData));
    }
    callback();
  });

  socket.on('disconnect', () => {
    var user = usersInstance.removeUser(socket.id);
    console.log(socket.id + 'is removed')

    if (user) {
      io.to(user.room).emit('updateUserList', usersInstance.getUserList(user.room));
    }
  });
});

const server = http.listen(app.get("port"), function() {
  console.log("listening on *:3000");
});

