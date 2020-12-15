class Enemy {
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  createEnemy() {
    var enemy = document.createElement('div');
    enemy.className = 'enemy';
    enemy.style.left = this.x + "px";
    enemy.style.top = this.y + "px";
    enemy.style.backgroundImage = "url('../images/enemy8.gif')";
    document.getElementById("container").appendChild(enemy);
  }
}

var level_1_enemies = [new Enemy(300,300),new Enemy(300,350),new Enemy(100,100)];

for (i = 0; i < level_1_enemies.length; i++) {
  level_1_enemies[i].createEnemy()
}

function bulletHit(){
  var enemies = document.getElementsByClassName('enemy')
  for (i = 0; i < enemies.length; i++) {
    let hor = enemies[i].style.left.slice(0, -2);
    x = parseInt(hor);
    let ver = enemies[i].style.top.slice(0, -2);
    y = parseInt(ver);
    for (a = 0; a < 50; a++){
      for (b = 0; b < 50; b++){
        if(!checkFree(x + a , y + b,getItem('bullet'))){
          enemies[i].remove();
          score += 20
          document.getElementById("scoreDisplay").innerHTML = "Score: " + String(score);
          var bullets = getItem('bullet');
          for (c = 0; c < bullets.length; c++){
            bullets[c].remove();
          }
        }
      }
    }
  }
}

function laserHit(){
  // Get enemies
  var enemies = document.getElementsByClassName('enemy')
  var lasers = document.getElementsByClassName('laser')
  
  
  let laser = lasers[0]
  var direction = ""
  var horLen = 50
  var verLen = 50
  var lowHor = 0
  var highHor = 0
  var lowVert = 0
  var highVert = 0
  var inZone = false

  console.log(document.getElementById(`${laser.id}`).classList)

  if (document.getElementById(`${laser.id}`).classList[1] == "rotateDown") {
    direction = "down";
    horLen = 50;
    verLen = 400;

    // Low Bound Hor
    lowVert = document.getElementById(`${laser.id}`).style.top.slice(0, -2);
    lowVert = parseInt(lowVert);

    // High Bound Ver
    highVert = lowVert + verLen
    

    // Low Bound Hor
    lowHor = document.getElementById(`${laser.id}`).style.left.slice(0, -2);
    lowHor = parseInt(lowHor);

    // Upper Bound Hor
    highHor = lowHor

  } else if (document.getElementById(`${laser.id}`).classList[1] == "rotateUp") {

    direction = "up";
    horLen = 50;
    verLen = -400;

    // Low Bound Hor
    highVert = document.getElementById(`${laser.id}`).style.top.slice(0, -2);
    highVert = parseInt(highVert);

    // High Bound Ver
    lowVert = highVert + verLen

    // Low Bound Hor
    lowHor = document.getElementById(`${laser.id}`).style.left.slice(0, -2);
    lowHor = parseInt(lowHor);

    // Upper Bound Hor
    highHor = lowHor


  } else if (document.getElementById(`${laser.id}`).classList[1] == "rotateBack") {
    direction = "left";
    horLen = -600 ;
    verLen = 50;

    // Low Bound Hor
    highHor = document.getElementById(`${laser.id}`).style.left.slice(0, -2);
    highHor = parseInt(highHor);

    // High Bound Ver
    lowHor = highHor + horLen
    

    // Low Bound Ver
    lowVert = document.getElementById(`${laser.id}`).style.top.slice(0, -2);
    lowVert = parseInt(lowVert);

    // Upper Bound Ver
    highVert = lowVert

  } else if (document.getElementById(`${laser.id}`).classList[1] == "noRotate") {
    direction = "right";
    horLen = 600 ;
    verLen = 50;

    // Low Bound Hor
    lowHor = document.getElementById(`${laser.id}`).style.left.slice(0, -2);
    lowHor = parseInt(lowHor);

    // High Bound Ver
    highHor = lowHor + horLen

    // Low Bound Ver
    lowVert = document.getElementById(`${laser.id}`).style.top.slice(0, -2);
    lowVert = parseInt(lowVert);

    // Upper Bound Ver
    highVert = lowVert

  }

  // For i in enemies
  for (i = 0; i < enemies.length; i++) {

    // Get Coords
    let hor = enemies[i].style.left.slice(0, -2);
    x = parseInt(hor);
    let ver = enemies[i].style.top.slice(0, -2);
    y = parseInt(ver);


    if ((x >= lowHor) && (x <= highHor)) {
      console.log("Within X.")

      console.log("LOW V: " + String(lowVert))
      console.log("HIGH V: " + String(highVert))
      console.log(y)
      if ((y >= lowVert) && (y <= highVert)) {
        console.log("Within Y.")

        // Do our enemy shizzle
        enemies[i].remove();
        score += 20
        document.getElementById("scoreDisplay").innerHTML = "Score: " + String(score); 

      }
    }

    


    }      
  }



var enemyInterval = setInterval(enemyMove, 1000);

function randomMovement(beings){
  for (i = 0; i < beings.length; i++) {
    let hor = beings[i].style.left.slice(0, -2);
    x = parseInt(hor);
    let ver = beings[i].style.top.slice(0, -2);
    y = parseInt(ver);
    let direction = Math.floor(Math.random() * 4);
    if (direction == 0 ){
      if (checkFree(x + 50, y, getItem('box'))){
        if ( (x != 550)&&(50 > 0) ) {
          beings[i].style.left = (x + 50) + 'px';
        }
      }
    }
    else if(direction == 1 )  {
      if (checkFree(x - 50, y, getItem('box'))){
        if ( (x != 0)&&(-50 < 0) ) {
          beings[i].style.left = (x - 50) + 'px';
        }
      }
    }
    else if(direction == 2 )  {
      if (checkFree(x, y - 50, getItem('box'))){
        if ( (y != 0)&&(-50 < 0) ) {
          beings[i].style.top = (y - 50) + 'px';
        }
      }
    }
    else {
      if (checkFree(x, y + 50, getItem('box'))){
        if ( (y != 350)&&(50 > 0) ) {
          beings[i].style.top = (y + 50) + 'px';
        }
      }
    }
  }
}



function enemyMove() {
  let enemies=document.getElementsByClassName('enemy');
  randomMovement(enemies);
  causeDamage();
}

function causeDamage(){
  let enemies=document.getElementsByClassName('enemy');
  for (i = 0; i < enemies.length; i++) {
    let hor = enemies[i].style.left.slice(0, -2);
    x = parseInt(hor);
    let ver = enemies[i].style.top.slice(0, -2);
    y = parseInt(ver);
    if (!checkFree(x, y, getGuy())) {
      playerInventory.heartInventory.pop();
      playerInventory.updateDisplay()
      playAudio("grunt")
      score -= 5
      document.getElementById("scoreDisplay").innerHTML = "Score: " + String(score);
      playerInventory.checkLife();
    }
  }
}
