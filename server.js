var express = require("express");
var app = express();
var path = require("path");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});
const PORT =  process.env.PORT || 5000;
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
//process.env.PORT ||