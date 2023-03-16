const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");

let player = { speed: 5 , score: 0 };
let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false,
};

startScreen.addEventListener("click", start);

document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);

//movement of the middle line

function moveLines(){
    let lines = document.querySelectorAll(".line");
    lines.forEach(function(item)
    {
        if(item.y > 1500){
            item.y -= 1500;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    });
}

//makes the enemy cars move

function moveEnemy(car){
  let enem = document.querySelectorAll(".enemy");
  enem.forEach(function(item)
  {
      if(isCollide(car, item)){
        endGame();
      }
      if(item.y > 1500){
          item.y = -600;
          item.style.left = Math.floor(Math.random() * 230) + "px";
      }
      item.y += player.speed;
      item.style.top = item.y + "px";
  });
}

//checks if the player car has collided with the enemy

function isCollide(a, b){
  let aReact = a.getBoundingClientRect();
  let bReact = b.getBoundingClientRect();

  return !(
    (aReact.bottom < bReact.top) || 
    (aReact.top > bReact.bottom) ||
    (aReact.right < bReact.left) ||
    (aReact.left > bReact.right)
  )

}

// movement of the car

function playGame() {
  let car = document.querySelector(".car");
  let road = gameArea.getBoundingClientRect();
  moveLines();
  moveEnemy(car);

  if (player.start) {
    if (keys.ArrowUp && player.y > road.top - 542) {
      player.y -= player.speed;
    }
    if (keys.ArrowDown && player.y < road.bottom - 237) {
      player.y += player.speed;
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x < road.width - 54) {
      player.x += player.speed;
    }
    car.style.left = player.x + "px";
    car.style.top = player.y + "px";
    window.requestAnimationFrame(playGame);
    player.score ++;
    score.innerText = "Score:" + player.score;
  }
}

//whenever a key is pressed

function pressOn(e) {
  e.preventDefault();
  keys[e.key] = true;
}


//whenever a key is released

function pressOff(e) {
  e.preventDefault();
  keys[e.key] = false;
}

//game ending function

function endGame(){
  player.start = false;
  score.innerHTML = "Game Over<br>Score was:" + player.score;
  startScreen.classList.remove("hide");
}

//when starting the game what happens

function start() {
  startScreen.classList.add("hide");
  gameArea.innerHTML=""
  player.start = true;
  player.score = 0;

//   road middle line
  for (let x = 0; x < 10; x++) {
    let div = document.createElement("div");
    div.classList.add("line");
    div.y = x*150;
    div.style.top = x * 150 + "px";
    gameArea.appendChild(div);
  }


//   car movement
  window.requestAnimationFrame(playGame);
  let car = document.createElement("div");
  car.innerText = "car";
  car.setAttribute("class", "car");
  gameArea.appendChild(car);
  player.x = car.offsetLeft;
  player.y = car.offsetTop;

//random car
  for (let x = 0; x < 10; x++) {
    let enemy = document.createElement("div");
    enemy.classList.add("enemy");
    enemy.y = ((x + 1)*600) * -1;
    enemy.style.top = enemy.y + "px";
    enemy.style.left = Math.floor(Math.random() * 230) + "px";
    gameArea.appendChild(enemy);
  }
}
