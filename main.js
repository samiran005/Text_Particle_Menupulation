const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];

//mouse handle
const mouse = {
    x: null,
    y: null,
    radius: 150,
}

window.addEventListener("mousemove", (event)=>{
    mouse.x = event.x;
    mouse.y = event.y;
})

ctx.fillStyle = "white";
ctx.font = "30px verdana";
ctx.fillText("A", 0, 50);