const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
const menu = document.querySelector("#menu");

let width = window.innerWidth;
let height = window.innerHeight;

window.addEventListener("resize",()=>{
    width=window.innerWidth;
    height= window.innerHeight;

    canvas.width=width;
    canvas.height=height;
    console.log(event);
})

canvas.width = width ;
canvas.height = height ;


const circles=[];

for(let i=0;i<=10;i++){
    circles.push({
        x:Math.random() * width,
        y:Math.random()*height,
        dx:(Math.random()-1),
        dy:(Math.random()-1),
        radius:50
    })
}

const update = ()=>{
    ctx.clearRect(0,0,width,height);

    circles.forEach(circle=>{
        circle.x += circle.dx;
        circle.y +=circle.dy;

        if(circle.x + circle.radius > width || circle.x -circle.radius < 0){
            circle.dx *=-1;
        }

        if(circle.y + circle.radius > height || circle.y- circle.radius < 0){
            circle.dy *=-1;
        }

        ctx.beginPath();
        ctx.shadowColor="rgba(0,150,255,0.8)";
        ctx.shadowBlur=30;
        ctx.lineWidth=2;
        ctx.strokeStyle ="rgba(0,150,255,0.8)";
        ctx.arc(circle.x,circle.y,circle.radius,0,Math.PI*2);
        ctx.stroke();
        ctx.closePath();
    })
    requestAnimationFrame(update);
}
update();