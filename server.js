var express = require("express");
var app = express();
var path = require("path");
const http = require("http")


const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});
const PORT =  process.env.PORT || 5000;

const servers = http.createServer(app)
const Websocket = require("ws");
const server = new Websocket.Server( {servers} )

server.on("connection", ws => {
    ws.send("welcome")
})


app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, function () {
    console.log("port: "+ PORT)
});
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