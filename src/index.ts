const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");
const road = document.querySelector(".road");

let player = { speed: 5 , score: 0, start: true, x: 0, y:0 };

const keys: Record<string, boolean> = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false,
};


startScreen?.addEventListener("click", start);

document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);

//movement of the middle line

interface CustomHTMLElement extends HTMLElement {
  y: number;
}


interface MyDivElement extends HTMLDivElement {
  y: number;
}

class CustomDiv extends HTMLDivElement implements CustomHTMLElement {
  y: number;
  constructor() {
    super();
    this.y = 0;
  }
}


function moveLines(): void {
  let lines = document.querySelectorAll(".line") as NodeListOf<CustomHTMLElement>;
  lines.forEach(function (item) {
    if (item.y > 1500) {
      item.y -= 1500;
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

//makes the enemy cars move

function moveEnemy(car: any): void{
  let enem = document.querySelectorAll(".enemy") as NodeListOf<CustomHTMLElement>;
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

//generate random road

function roadGenerator(): void {
  for (let x = 0; x < 300; x++) {
    let div = document.createElement("div") as HTMLDivElement;
    div.classList.add("road");
    div.style.left = Math.floor(Math.random() * 230) + "px";
    road?.appendChild(div);
  }
}

//checks if the player car has collided with the enemy

function isCollide(a: any, b: any){
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

function playGame(): void {
  let car = document.querySelector(".car") as HTMLDivElement;
  let score = document.querySelector(".score") as HTMLElement;
  if(!gameArea){
    return;
  }
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
    if(!score){
      return;
    }
    score.innerText = "Score:" + player.score;
  }
}

//whenever a key is pressed

function pressOn(e: KeyboardEvent): void {
  e.preventDefault();
  keys[e.key] = true;
}


//whenever a key is released

function pressOff(e: any) {
  e.preventDefault();
  keys[e.key] = false;
}

//game ending function

function endGame(){
  player.start = false;
  if(!score || !startScreen){
    return;
  }
  score.innerHTML = "Game Over<br>Score was:" + player.score;

  startScreen.classList.remove("hide");
}

//when starting the game what happens

function start() {
  

  if(!gameArea || !startScreen){
    return;
  }
  startScreen.classList.add("hide");
  gameArea.innerHTML=""
  player.start = true;
  player.score = 0;

  roadGenerator();

//   road middle line
  for (let x = 0; x < 10; x++) {
    let div: MyDivElement = new CustomDiv();
    div.classList.add("line");
    div.y = x * 150;
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
    let enemy: MyDivElement = new CustomDiv();
    enemy.classList.add("enemy");
    enemy.y = ((x + 1)*600) * -1;
    enemy.style.top = enemy.y + "px";
    enemy.style.left = Math.floor(Math.random() * 230) + "px";
    gameArea.appendChild(enemy);
  }
}
