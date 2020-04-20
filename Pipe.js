function Pipe() {
    this.gap=random(150,200)
    this.top = random(height/2);
    this.bottom = this.top + this.gap;
    this.x = width;
    this.w = 40;
    this.speed = 2;  
    this.highlight = false;
    
    
    this.show = function() {
      fill(0,255,0);
      if(this.highlight){
        fill(255,0,0);
      }
      rect(this.x, 0, this.w, this.top);
      rect(this.x, this.bottom, this.w, height-this.top);
    }
    
    this.update = function() {
      this.x -= this.speed;
    }
    
    this.offscreen = function() {
      if(this.x < -this.w){
        return true;
      }
      else
        return false;
    }
    
    this.hits = function(birds) {
      if(birds.y<this.top || birds.y>this.bottom)     {
        if(birds.x>this.x && birds.x<this.x+this.w) {
          this.highlight=true;
          return true;
          
        }
      }
      return false;
    }
  }