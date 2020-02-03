var express = require("express");
var app = express();
var path = require("path");
const PORT = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, 'public')));
// app.get("/", function (req, res) {
//
//     res.sendFile(path.join(__dirname+'/public/index.html'));
//
// });

app.listen(PORT, function () {
    console.log("port: "+ PORT)
});
