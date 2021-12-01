//written by hoseob.jeong
//Final Project - Make a Game
//Course CS099
//Spring 2019

class Particle{
constructor(x,y,v,a,g){
this.x = x;
this.y = y;
this.v = v;
this.a = a;
this.g = g;
 
}

draw(){
  push()
  fill('red')
  noStroke()
 ellipse(this.x,this.y, 5,5)
  pop()
}

update(){
 this.x+=this.v.x + random(0,5);
 this.y+=this.v.y ;
}

  gravity(){
   
   this.v.x += this.g.x;
   this.v.y += this.g.y;  
    
  }
  
  accele(){
    
   this.v.x += this.a.x;
   this.v.y += this.a.y;
    
  }

}