var express = require("express");
var app = express();
var path = require("path");
const PORT = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, function () {
    console.log("port: "+ PORT)
});

var allArr;
app.post("/", function (req, res) {

    console.log(req.body)

});