var socket = io.connect("https://stormy-refuge-28123.herokuapp.com/")
var obj = {
    color: "black",
    lineWidth:10,
    moveTo:[],
    line:[]
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


paint.addEventListener("mousedown", (e)=>{
    draw = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
    obj = {
        moveTo:[e.offsetX, e.offsetY],
    };
});
paint.addEventListener("mousemove", (e)=>{
    if(!draw) return;
    console.log(e)
    ctx.lineTo(e.offsetX, e.offsetY);
    obj.color = ctx.strokeStyle;
    obj.lineWidth = ctx.lineWidth;
    console.log(obj)
    obj.lineTo = [];
    obj.lineTo.push(e.offsetX, e.offsetY);
    ctx.stroke();
});
paint.addEventListener('mouseup', () => {
    draw = false;
    allArr.push(obj);
    socket.emit("line",
        JSON.stringify(allArr)
    )
});
paint.addEventListener('mouseout', () => draw = false);


var massage = document.getElementById("massage"),
    handle = document.getElementById("handle"),
    btn = document.getElementById("send"),
    output = document.getElementById("output")
    get = document.getElementById("get")


btn.addEventListener("click", function () {
    socket.emit("chat",{
        massage:massage.value,
        handle:handle.value
    })
});


socket.on('chat', function (data) {
    output.innerHTML += "<p>"+ data.handle + " :" +data.massage + "</p>"
})
socket.on('line', function (data) {
    let lineObj = JSON.parse(JSON.parse(data))
    console.log(lineObj)
    drawLine(lineObj)
});


drawLine = (obj) => {
    for(let i = 0 ; i < obj.length; i++) {
        ctx.beginPath();
        ctx.moveTo(obj[i].moveTo[i], obj[i].moveTo[i+1]);
        ctx.strokeStyle = obj[i].color;
        ctx.lineWidth = obj[i].lineWidth;
        var lineArr = obj[i].lineTo;
        for (var j = 0; j < lineArr.length; j = j + 2) {
            if (lineArr[j + 1] == undefined) {
                return;
            } else {
                ctx.lineTo(lineArr[j], lineArr[j + 1]);
                ctx.stroke()
            }
        }
    }
}









