var express = require("express");
var app = express();
var path = require("path");
const http = require("http")


const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});
const PORT =  process.env.PORT || 5000;
//process.env.PORT ||
//const servers = http.createServer(app)
// const Websocket = require("ws");


var socket = require("socket.io")


app.use(express.static(path.join(__dirname, 'public')));

var server = app.listen(PORT, function () {
    console.log("port: "+ PORT)
});


var io = socket(server);
io.on("connection", function (socket) {
        console.log("socket connection", socket.id)
    socket.on("chat", function (data) {
        io.sockets.emit("chat", data)
    })
    socket.on("line", function (data) {

        io.sockets.emit("line", JSON.stringify(data))

    })
})
// const server = new Websocket.Server( {serverforSoket} )
//
// server.on("connection", ws => {
//     ws.send("welcome")
// })


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var allArr;
app.post("/saveLine", function (req, res) {
    console.log(req.body.allArr)
    allArr = req.body.allArr;

    res.json(allArr)

});

app.get("/getLine", function (req, res) {
    res.send(allArr)
})
//process.env.PORT ||