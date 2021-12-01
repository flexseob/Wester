//written by hoseob.jeong
//Final Project - Make a Game
//Course CS099
//Spring 2019

class GrassParticle{
constructor(x,y,v,a){
this.x = x;
this.y = y;
this.v = v;
this.a = a;
this.thrust = createVector(0,0);
this.angle = 0;



}

draw(){
  push()
 translate(this.x,this.y)
  rotate(this.angle)
  noStroke()
  image(imggrass,0,0,60,60)
  pop()
}

update(){
 
  this.x+= this.v
  this.thrust.set(0.1,0)
 
}
  
  accele(){
    
   this.x += this.thrust.x;

  }
  
  
  
  anglermove(){

  this.angle -= 0.02;
  

  }


}