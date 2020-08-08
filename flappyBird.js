var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');
// console.log(ctx)

//Loading images

var bird = new Image();
var bg = new Image();
bg.onload=draw;
// bg.onerror=function(){alert(bg.src+' failed');} 
var fg = new Image();
var topPipe = new Image();
var bottomPipe = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
topPipe.src = "images/pipeTop.png";
bottomPipe.src = "images/pipeBottom.png";

//variables

var gap = 140;
var constant = topPipe.height+gap;
var bX = 10;
var bY = 150;
gravity=1;

//on key press

document.addEventListener("keydown", moveUp);

function moveUp(){
    bY -= 45;
}

var pipe = [];
var score = 0;
pipe[0] = {
    x : cvs.width,
    y: -40
};



function draw(){
    // alert('working')
    ctx.drawImage(bg,0,0);
    // ctx.drawImage(topPipe,100,0);
    //     ctx.drawImage(bottomPipe,100,constant);
    for(var i=0; i < pipe.length;i++){
        ctx.drawImage(topPipe,pipe[i].x,pipe[i].y);
        ctx.drawImage(bottomPipe,pipe[i].x,pipe[i].y+constant);
        pipe[i].x--;


        if(pipe[i].x == 70){
            pipe.push({
                x: cvs.width,
                y:Math.floor((Math.random()*0.7+0.2)*topPipe.height)-topPipe.height
            })
        }

        if(bX + bird.width >= pipe[i].x && bX <= pipe[i].x + topPipe.width &&
             (bY <= pipe[i].y + topPipe.height || bY + bird.height >= pipe[i].y + constant) ||
             bY + bird.height >= cvs.height -fg.height){
                 location.reload();
        }

        if(pipe[i].x == 5){
            score++;
        }

    }
    ctx.drawImage(fg,0,cvs.height - fg.height);
    ctx.drawImage(bird,bX,bY);
    bY+=gravity;

    ctx.fillStyle = "#000";
    ctx.font = "40px Verdana";
    ctx.fillText("Score: " + score,10,cvs.height-20);
    requestAnimationFrame(draw);
}

// draw();
