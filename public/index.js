





//document.addEventListener("DOMContentLoaded", draw1) ;



var Node = function (value) {
    this.value = value;
    this.right = null;
    this.left = null;
};

function BStree() {
    this.root = null;
}

var count = 1
BStree.prototype.init = function (array) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.strokeStyle = "green";
    var x = 195  ; // x coordinate
    var y = 75 ; // y coordinate
    var radius = 25; // Arc radius
    ctx.font = "30px Arial";
    ctx.fillText(`${array[0]}`, x, y);
    ctx.arc(x, y, radius, 0, 360);
    ctx.stroke();
    this.clear()
    for(var i = 0; i < array.length; i++){
        this.add(array[i]);
    }
};


BStree.prototype.clear = function () {
    this.root = null;
};

BStree.prototype.add = function(value) { // 18 --> 25
    if (value === null) {
        return;
    }
    this.root = this.addNode(this.root, value);
};
var counter = 1;
BStree.prototype.addNode = function(node, value) {
    if (node === null) {
        node = new Node(value);
    }
    else if (value < node.value) {
        node.left = this.addNode(node.left, value);
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.strokeStyle = "blue";
        var x = 195 + counter *50  ; // x coordinate
        var y = 75 + counter *50  ; // y coordinate
        var radius = 25; // Arc radius
        ctx.font = "30px Arial";
        ctx.fillText(`${value}`, x, y);
        ctx.arc(x, y, radius, 0, 360);
        ctx.stroke();
        counter++
    } else {
        node.right = this.addNode(node.right, value);
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.strokeStyle = "red";
        var x = 195 - count *50  ; // x coordinate
        var y = 75 + count *50  ; // y coordinate
        var radius = 25; // Arc radius
        ctx.font = "30px Arial";
        ctx.fillText(`${value}`, x, y);
        ctx.arc(x, y, radius, 0, 360);
        ctx.stroke();
        count++

    }
    return node;
};

//
// var r = new BStree()
// r.init([5,6,2,3,8,1])
// console.log(r.root)
//
//
// let socket = new WebSocket("ws://stormy-refuge-28123.herokuapp.com/");


var obj = {
    color: "black",
    moveTo:[1],
    lineTo:[2]
};
var allArr = [];

var paint = document.querySelector("#canvas1");
var ctx = paint.getContext("2d");

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;
var draw = false;

var inputColor =document.querySelector("INPUT");
inputColor.addEventListener("change",(e) => {
    ctx.strokeStyle = e.target.value;
});

var lineWidth = document.querySelector("#lineWidth");
lineWidth.addEventListener("change", (e)=>{
    ctx.lineWidth = e.target.value;
});
var obj

paint.addEventListener("mousedown", (e)=>{
    draw = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
    obj = {
        color: "black",
        moveTo:[e.offsetX, e.offsetY],
        lineTo:[2]
    };
    console.log(obj)
});
paint.addEventListener("mousemove", (e)=>{

    if(!draw) return;
    // ctx.save();
    ctx.lineTo(e.offsetX, e.offsetY);
    obj.lineTo.push(e.offsetX, e.offsetY)
    console.log(obj)
    ctx.stroke();
    // ctx.restore()


});
paint.addEventListener('mouseup', () => {
    draw = false;
    allArr.push(obj)
    console.log(allArr)
});
paint.addEventListener('mouseout', () => draw = false);

document.getElementById("but").addEventListener("click", ()=>{

    ctx.beginPath();
    ctx.moveTo(allArr[0].moveTo[0],  allArr[0].moveTo[1]);
    ctx.strokeStyle = "green";
    ctx.lineWidth = 30;
    var lineArr = allArr[0].lineTo;
    for(var i = 1; i < lineArr.length; i = i + 2){
        if(lineArr[i + 1] == undefined){
            return;
        }else {
            ctx.lineTo(lineArr[i], lineArr[i + 1]);
            ctx.stroke()
        }
    }
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://stormy-refuge-28123.herokuapp.com/saveline");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify({allArr}));
    xhr.onload = function () {
        // if (xhr.status === 200 && xhr.readyState === 4) {

            console.log(this.response)

      //  }
    };
});