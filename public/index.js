





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


var r = new BStree()
r.init([5,6,2,3,8,1])
console.log(r.root)
//
//
// function draws(arr) {
//     if (arr.length === 1) return;
//     var canvas = document.getElementById('canvas');
//     var ctx = canvas.getContext('2d');
//     var count = 0;
//     var min = arr[0];
//     for(var i = 0; i < arr.length; i++) {
//
//         if (min < arr[i + 1]) {
//             console.log(arr[i])
//             ctx.beginPath();
//             var x = 195 + i * 50; // x coordinate
//             var y = 75 + i * 50; // y coordinate
//             var radius = 25; // Arc radius
//             var startAngle = 0; // Starting point on circle
//            // var endAngle = Math.PI + (Math.PI * j) / 2; // End point on circle
//             ctx.arc(x, y, radius, 0, 360);
//             ctx.stroke();
//
//
//         } else{
//             count++;
//             console.log(arr[i])
//             ctx.beginPath();
//             var x = 195 - i* 50; // x coordinate
//             var y = 75 + i * 50; // y coordinate
//             var radius = 25; // Arc radius
//             var startAngle = 0; // Starting point on circle
//            // var endAngle = Math.PI + (Math.PI * j) / 2; // End point on circle
//             ctx.arc(x, y, radius, 0, 360);
//             ctx.stroke();
//
//         }
//     }
// }

//draws([2,5,6,1,3])


let socket = new WebSocket("ws://stormy-refuge-28123.herokuapp.com/");
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


paint.addEventListener("mousedown", (e)=>{
    draw = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
    socket.send("hello");

});
paint.addEventListener("mousemove", (e)=>{

    if(!draw) return;
    // ctx.save();
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    // ctx.restore()


});
paint.addEventListener('mouseup', () => {
    draw = false;
});
paint.addEventListener('mouseout', () => draw = false);


document.onload = function (e) {
    socket.onmessage = function(e) {
        console.log(e.data);
    }
}
