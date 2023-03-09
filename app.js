import { Game } from "./game/game.js";

console.log("Game starting....");


let uiGameBoard = document.querySelector("#app");

let game = new Game();

let rowHeight = window.innerHeight / Game.MAP_ROWS;

function uiAddGameRow(roadRow){
    let rowDiv = document.createElement('div');
    rowDiv.className = "road-row";
    rowDiv.style.height = rowHeight + 'px';

    let leftDiv = document.createElement('div');
    let rightDiv = document.createElement('div');
    let roadDiv = document.createElement('div');
    leftDiv.className = 'leftedge';
    rightDiv.className = 'rightedge';
    roadDiv.className = 'road';

    /*
    leftDiv.style.height = rowHeight + 'px';
    rightDiv.style.height = rowHeight + 'px';
    roadDiv.style.height = rowHeight + 'px';
    */
    
    leftDiv.style.width = (roadRow.leftEdge * 100 )+ '%';
    roadDiv.style.width = (roadRow.rightEdge - roadRow.leftEdge) * 100 + '%';
    rightDiv.style.width = (1 - roadRow.rightEdge) * 100 + '%';
    

    console.log(roadRow.leftEdge + " - " + roadRow.rightEdge + " - " + game.leftDirectionDuration + " - " + game.rightDirectionDuration);

    rowDiv.appendChild(leftDiv);
    rowDiv.appendChild(roadDiv);
    rowDiv.appendChild(rightDiv);

    return rowDiv;

}


for (let index = Game.MAP_ROWS - 1; index >= 0; index--) {
    
    uiGameBoard.appendChild(uiAddGameRow(game.state.map[index]));
}

setInterval(() => {
    game.addNewMapRow();
    uiGameBoard.childNodes[uiGameBoard.childNodes.length - 1].remove();
    uiGameBoard.prepend(uiAddGameRow(game.state.map[Game.MAP_ROWS - 1]));

}, 100);

