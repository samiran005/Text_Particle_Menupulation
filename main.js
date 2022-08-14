const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const writeTheName = "SAMIR";
const textFont = 10;

let particleArray = [];
let adjustX = 2;
let adjustY = -6;

//mouse handle
const mouse = {
    x: null,
    y: null,
    radius: 120,
}

window.addEventListener("mousemove", (event)=>{
    mouse.x = event.x;
    mouse.y = event.y;
})

ctx.fillStyle = "white";
ctx.font = "30px verdana";
ctx.fillText(writeTheName, 0, 50);
const textCordinates = ctx.getImageData(0,0,500,100)




//particle creation class
class Perticle {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.radius = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 8) + 1
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
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
        if(distance < maxDistance){
            this.x -= directionX;
            this.y -= directionY;
        }else {
            if(this.x != this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx/10;
            }
            if(this.y != this.beseY) {
                let dy = this.y - this.baseY;
                this.y -= dy/10;
            }
        }
    }
}

//position of the peritcle
function init() {
    particleArray = [];
    for(y = 0, y2 = textCordinates.height; y < y2; y++){
        for(x = 0, x2 = textCordinates.width; x < x2; x++){
            if(textCordinates.data[(y * 4 * textCordinates.width) + 
            (x * 4) + 3] > 128){
                let positonX = x + adjustX;
                let positionY = y + adjustY;
                particleArray.push(new Perticle(
                    positonX * textFont, 
                    positionY * textFont
                    ));
            }
        }
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
cunnect();

    requestAnimationFrame(animate);
}
animate();


// make line between two points
function cunnect() {
    for(a = 0; a < particleArray.length; a++){
        for(b = a; b < particleArray.length; b++){
            let dx = particleArray[a].x - particleArray[b].x;
            let dy = particleArray[a].y - particleArray[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if(distance < 30){
                let oposity = 1 - (distance/30);
                ctx.strokeStyle = `rgba(255,0,0,${oposity})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particleArray[a].x,particleArray[a].y);
                ctx.lineTo(particleArray[b].x,particleArray[b].y);
                ctx.stroke();
            }
        }
    }
}
