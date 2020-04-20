var bird;
var pipes = [];
function setup() {
  createCanvas(1280, 720);
  bird = new Bird();
  pipes.push(new Pipe());
}

function draw() {
  
  
  background(0);
  bird.update();
  bird.show();
  
  if(frameCount%100==0){
   pipes.push(new Pipe());
  }
  
  
  for(var i=pipes.length-1;i>=0;i--){
    if(pipes[i].hits(bird)){
      console.log("HIT");
    }
    pipes[i].show();
    pipes[i].update();
    if(pipes[i].offscreen()){
      pipes.splice(i,1);
    }
  }
  
}

function keyPressed() {  
  if(key == " ") {
    bird.up();
  }
}
  
