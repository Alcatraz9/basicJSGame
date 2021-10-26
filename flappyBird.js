const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');

// Loading images
const bird = new Image();
const bg = new Image();
bg.onload=draw;
const fg = new Image();
const topPipe = new Image();
const bottomPipe = new Image();

bird.src = 'images/bird.png';
bg.src = 'images/bg.png';
fg.src = 'images/fg.png';
topPipe.src = 'images/pipeTop.png';
bottomPipe.src = 'images/pipeBottom.png';

// variables
const gap = 140;
const constant = topPipe.height+gap;
const bX = 10;
let bY = 150;
gravity=1;

// on key press
document.addEventListener('keydown', moveUp);

// function to perform jump
function moveUp() {
  bY -= 45;
};

const pipe = [];
let score = 0;
pipe[0] = {
  x: cvs.width,
  y: -40,
};

function draw(){
  ctx.drawImage(bg, 0, 0);
  for ( let i=0; i < pipe.length; i++) {
    ctx.drawImage(topPipe, pipe[i].x, pipe[i].y);
    ctx.drawImage(bottomPipe, pipe[i].x, pipe[i].y+constant);
    pipe[i].x--;

    if (pipe[i].x == 70) {
      pipe.push({
        x: cvs.width,
        y: Math.floor((Math.random()*0.7+0.2)*topPipe.height)-topPipe.height,
      });
    }

    if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + topPipe.width &&
        (bY <= pipe[i].y + topPipe.height ||
            bY + bird.height >= pipe[i].y + constant) ||
             bY + bird.height >= cvs.height -fg.height) {
      location.reload();
    }

    if (pipe[i].x == 5) {
      score++;
    }
  }

  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(bird, bX, bY);
  bY+=gravity;

  ctx.fillStyle = '#000';
  ctx.font = '40px Verdana';
  ctx.fillText('Score: ' + score, 10, cvs.height-20);
  requestAnimationFrame(draw);
}
