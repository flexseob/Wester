//written by hoseob.jeong
//Final Project - Make a Game
//Course CS099
//Spring 2019


let go_start = 0;
let check_player1_times = []
let check_player2_times = []
let reset_time = []
let state
let reseter
let counter = 0
let p1_pressed = false
let p2_pressed = false
let reset_pressed = false
let particles = []
let restart_trigger = false
let image_trigger_player1 = false
let image_trigger_player2 = false
let cloudmoving = 0


function preload() {
  imgPlayer1 = loadImage('imagefolder/player1.png')
  imgPlayer2 = loadImage('imagefolder/player2.png')
  imgbg = loadImage('imagefolder/bg.png')
  imghelp = loadImage('imagefolder/help.png')
  imgclickhelp = loadImage('imagefolder/clickhelp.png')
  imghelpmessage = loadImage('imagefolder/message.png')
  imggrass = loadImage('imagefolder/grass.png')
  shootsound = loadSound('soundfolder/shoot.wav')
  resetsound = loadSound('soundfolder/resetsound.wav')
  imgReady = loadImage('imagefolder/ready.png')
  imgGo = loadImage('imagefolder/GO.png')
  imgPlayer1ready = loadImage('imagefolder/player1ready.png')
  imgPlayer2ready = loadImage('imagefolder/player2ready.png')
  imgcloud = loadImage('imagefolder/cloud.png')
  imgplayer1win = loadImage('imagefolder/player1win.png')
  imgplayer2win = loadImage('imagefolder/player2win.png')
  imgplayer1suicide = loadImage('imagefolder/player1suicide.png')
  imgplayer2suicide = loadImage('imagefolder/player2suicide.png')
  imghowtoplay = loadImage('imagefolder/howtoplay.png')
}


function main_menu() {

  image(imghelp, 0, 0, 50, 50)
  if (mouseX < 50 && mouseY < 50) {
    image(imgclickhelp, 0, 0, 50, 50)
    image(imghelpmessage, 50, 50, 200, 100)

  }
}

// in setup function It has first random ready time, new grass particle class
function setup() {
  createCanvas(800, 400);
  textSize(20)
  go_start = random(2000, 10000);
  grass = new GrassParticle(width / 3, height / 2 + 65, 2.5)
}

function draw() {
  background(imgbg);
  cloudmove()
  push()
  imageMode(CENTER)
  image(imghowtoplay, width / 2, 80, 400, 25)
  pop()
  ready()
  grass.update()
  grass.anglermove()
  grass.accele()
  grass.draw()
  if (grass.x - 20 > width) {
    grass.x = 0
  }
  if (grass.x < 0) {
    grass.x = width
  }
  playerimage()
  main_menu()
  text('Made by hoseob.jeong', width - 250, height - 20)
}

// this function make cloud to move
function cloudmove() {
  cloudmoving = (cloudmoving + 1) % width
  image(imgcloud, cloudmoving, 70, 100, 100)


}


//timer to go time 
function go_start_timer() {
  if (reset_time[0] == null) {
    return go_start
  }
  if (reset_time[counter - 1] !== null) {
    go_start = reset_time[counter - 1] + reset_timer()
    return go_start;
  }

}
// result to show the players image for the polish based on variables 
function playerimage() {
  if (image_trigger_player1 == false & image_trigger_player2 == false) {
    image(imgPlayer1ready, width / 4, height / 2 + 55, 70, 70)
    image(imgPlayer2ready, 3 * width / 4, height / 2 + 55, 70, 70)

  } else if (image_trigger_player1) {
    push()
    translate(width / 4, height / 2 + 150)
    rotate(-HALF_PI)
    image(imgPlayer1, 0, 0, 70, 70)
    pop()
    image(imgPlayer2, 3 * width / 4, height / 2 + 55, 70, 70)
  } else if (image_trigger_player2) {

    image(imgPlayer1, width / 4, height / 2 + 55, 70, 70)
    push()
    translate(3 * width / 4 + 70, height / 2 + 80)
    rotate(HALF_PI)
    image(imgPlayer2, 0, 0, 70, 70)
    pop()
  }

}
//check to ready timer and settings and if someone shoot at ready time, player will suicide. to use return statement
function ready() {
  image_trigger_player1 = false
  image_trigger_player2 = false
  ready_shoot()
  if (check_player1_times[counter] - go_start < 0 || check_player2_times[counter] - go_start < 0) {
    return;
  }
  if (millis() < go_start_timer()) {
    push()
    imageMode(CENTER)
    image(imgReady, width / 2, height / 2, 100, 50)
    pop()
  } else if (millis() >= go_start_timer()) {
    go();
    return;

  }
}

//ready_shoot function, if you shoot the gun at ready time, player will suicide. this function has result about shooting at ready time.
// player press the button at ready time, presstime save at check_player_times[] and check the time , and then, show the result 'suicide'
function ready_shoot() {
  push()
  imageMode(CENTER)
  textSize(30)

  if (check_player1_times[counter] - go_start < 0 && check_player2_times[counter] == null) {
    image(imgplayer1suicide, width / 2, 1.5 * height / 4, 300, 40)
    image_trigger_player1 = true
    result_text()
    particle(width / 4 + 30, height / 2 + 100, -1, -0.98)
  } else if (check_player2_times[counter] - go_start < 0 && check_player1_times[counter] == null) {
    image(imgplayer2suicide, width / 2, 1.5 * height / 4, 300, 40)
    image_trigger_player2 = true
    result_text()
    particle(3 * width / 4 + 30, height / 2 + 100, 1, 0.98)
  } else if (check_player1_times[counter] - go_start < 0 && check_player1_times[counter] < check_player2_times[counter]) {

    image(imgplayer1suicide, width / 2, 1.5 * height / 4, 300, 40)
    image_trigger_player1 = true
    result_text()
    particle(width / 4 + 30, height / 2 + 100, -1, -0.98)
  } else if (check_player2_times[counter] - go_start < 0 && check_player1_times[counter] > check_player2_times[counter]) {

    image(imgplayer2suicide, width / 2, 1.5 * height / 4, 300, 40)
    image_trigger_player2 = true
    result_text()
    particle(3 * width / 4 + 30, height / 2 + 100, 1, 0.98)

  }
  // restart_trigger use for sequential
  restart_trigger = true
  pop()


}
// this is to get random ready time just once if you press reset button.
function reset_timer() {
  switch (state) {
    case 0:
      break;
    case 1:
      reseter = random(2000, 10000); // go_start???
      state = 0;
      break;
  }
  return reseter;
}
// press others key do not nothing
function nothing() {}

// shooting time
function go() {

  push()
  fill('red')
  textSize(40)
  imageMode(CENTER)
  image(imgGo, width / 2, height / 2, 80, 60)
  pop()
  restart_trigger = true
  result()
}

// keyPressed have shoottime millis if player presses button,check_player_times array pushs the button pressed time from millis().p_pressed is trigger for not going to another function to fast
function keyPressed() {
  var shoottime1 = millis()
  var shoottime2 = millis()


  if (keyCode == 65) {
    if (counter >= check_player1_times.length) {
      check_player1_times.push(shoottime1)
      shootsound.play()


      return;
    }
  }
  if (keyCode == 75) {
    if (counter >= check_player2_times.length) {
      check_player2_times.push(shoottime2)
      shootsound.play()


      return;
    }
  }

  // this is reset button. if don't press shoot button get millis() time to save array because for sequential. if don't have this code,  It can not get the same counter array length. So counter number is more than reset_time.length, 
  if (keyCode == 82 && restart_trigger) {
    if (check_player1_times[counter] == null) {

      check_player1_times[counter] = millis()

    }
    if (check_player2_times[counter] == null) {

      check_player2_times[counter] = millis()

    }

    if (counter >= reset_time.length) {
      resetsound.play()
      reset_pressed = true
      reset_time[counter] = millis()
      state = 1
      image_trigger_player1 = false
      image_trigger_player2 = false

    }
    restart_trigger = false

  }
  // if press without 'a' 'k' 'r', nothing to do.
  if (keyCode != 65 && keyCode != 75 && keyCode != 82) {
    return nothing()

  }
  // check the result counter number.
  if (reset_pressed) {
    counter += 1
    reset_pressed = false
  }

}

// this function get class particles to show the blood particleb
function particle(x, y, r, g) {
  for (i = 0; i < particles.length; ++i) {
    particles[i].update();
    particles[i].accele();
    particles[i].gravity();
    particles[i].draw();
    // console.log(particles.length)
  }

  for (i = 0; i < 50; ++i) {

    VVV = new Velocity(0, 0);
    particles.splice(i, 3);
    VVV.setLength(random(1, 5))
    VVV.setAngle(random(0, 2 * PI))
    particles.push(new Particle(x, y, VVV, new Velocity(r, 0), new Velocity(g, 0)));

  }
}




//result text message
function result_text() {

  if (check_player1_times[counter] != null) {
    text(floor(check_player1_times[counter] - go_start) / 1000 + 's', width / 4, height / 3 - 15)
  }
  if (check_player2_times[counter] != null) {
    text(floor(check_player2_times[counter] - go_start) / 1000 + 's', 3 * width / 4, height / 3 - 15)
  }

}





//result function to check the data and give the result
function result() {
  push()
  imageMode(CENTER)
  textSize(30)
  if (check_player1_times[counter] < check_player2_times[counter]) {
    image(imgplayer1win, width / 2, 1.5 * height / 4, 300, 40)
    image_trigger_player2 = true
    result_text()
    particle(3 * width / 4 + 30, height / 2 + 100, 1, 0.98)
  } else if (check_player1_times[counter] > check_player2_times[counter]) {
    image(imgplayer2win, width / 2, 1.5 * height / 4, 300, 40)
    image_trigger_player1 = true
    result_text()
    particle(width / 4 + 30, height / 2 + 100, -1, -0.98)
  } else if (check_player1_times[counter] != null && check_player2_times[counter] != null && (check_player1_times[counter] == check_player2_times[counter])) {
    text('Draw', width / 2, 1.5 * height / 4)
  } else if (check_player1_times[counter] != null && check_player2_times[counter] == null) {
    image(imgplayer1win, width / 2, 1.5 * height / 4, 300, 40)
    image_trigger_player2 = true
    result_text()
    particle(3 * width / 4 + 30, height / 2 + 100, 1, 0.98)
  } else if (check_player1_times[counter] == null && check_player2_times[counter] != null) {
    image(imgplayer2win, width / 2, 1.5 * height / 4, 300, 40)
    image_trigger_player1 = true
    result_text()
    particle(width / 4 + 30, height / 2 + 100, -1, -0.98)
  }

  if (keyIsDown) {
    result_text()
  }
  pop()

}