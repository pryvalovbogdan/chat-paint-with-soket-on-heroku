let express = require("express");
let app = express();
let path = require("path");

const bodyParser = require("body-parser");
const PORT =  process.env.PORT || 5000;

let socket = require("socket.io");
let allArr;
app.use(express.static(path.join(__dirname, 'public')));

let server = app.listen(PORT, function () {
    console.log("port: "+ PORT)
});


let io = socket(server);
io.on("connection", function (socket) {
    socket.on("chat", function (data) {
        io.sockets.emit("chat", data)
    });
    socket.on("line", function (data) {
        io.sockets.emit("line", JSON.stringify(data))

    })
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post("/saveLine", function (req, res) {
    allArr = req.body.allArr;

    res.json(allArr)

});

app.get("/getLine", function (req, res) {
    res.send(allArr)
});
