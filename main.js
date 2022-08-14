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
const data = ctx.getImageData(0,0,100,100)


//particle creation class
class Perticle {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.radius = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1
    }
    draw(){
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if(distance < 100){
            this.radius = 10;
        }else {
            this.radius = 3;
        }
    }
}

//position of the peritcle
function init() {
    particleArray = [];
    for(i=0;i<1000;i++){
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particleArray.push(new Perticle(x,y))
    }
} 
init();

//draw perticle
function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(i = 0; i < particleArray.length; i++){
        particleArray[i].draw();
        particleArray[i].update();
    }
    requestAnimationFrame(animate);
}
animate();