var express = require("express");
var app = express();
var path = require("path");
const PORT = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, function () {
    console.log("port: "+ PORT)
});

var allArr;
app.post("/saveline", function (req, res) {
    console.log(req.body)
    // client.query(`SELECT * FROM teachers WHERE login = '${user.login}';`, [], function (err, result) {
    //     console.log(result.rows, `${user.login}`);
    //     var baselogin;
    //     for (var key in result.rows) {
    //         console.log(`${user.login}`)
    //         baselogin = result.rows[key].login;
    //     }
    //     if (baselogin !== `${user.login}`) {
    //         var newUser = `INSERT INTO teachers(login, password, email, phone_number,keyword) VALUES ('${user.login}', '${user.password}', '${user.email}', '${user.phone}','${user.keyword}')`;
    //         client.query(newUser, []);
    //     } else {
    //         res.status(400).send('Bad Request ');
    //     }

    //
    // });

});