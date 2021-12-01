//written by hoseob.jeong
//Final Project - Make a Game
//Course CS099
//Spring 2019

class Velocity {
  constructor(x, y) {
    this.x = x;
    this.y = y;

  }

  
  
  getAngle() {
    return atan2(this.y, this.x);
  }

  setAngle(angle_in_radians) {
    let length = this.getLength();
    this.x = cos(angle_in_radians) * length;
    this.y = sin(angle_in_radians) * length;
  }
  getLength() {
    return sqrt((this.x * this.x) + (this.y * this.y));
  }

  setLength(length) {
    
    let angle = this.getAngle();
    this.x = cos(angle) * length;
    this.y = sin(angle) * length;
  }
 
}