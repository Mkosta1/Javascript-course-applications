
import { RoadRow } from "/roadRow.js";

export class Game{
    constructor(){
        this.state = {
            map: [],
            car: 0.5,
            isRunning: false,
            speed: 1,
        }
        this.initializeState();

    }
 
    addNewMapRow(){

        this.leftDirectionDuration --;
        this.rightDirectionDuration --;

        if(this.leftDirectionDuration < 0){
            this.leftDirectionDuration = Math.floor(Math.random() * 5);
            this.leftRirection = (Math.random() - 0.5) / 4;
        }   

        if(this.rightDirectionDuration < 0){
            this.rightDirectionDuration = Math.floor(Math.random() * 5);
            this.rightRirection = (Math.random() - 0.5) / 4;
        }   


        this.leftEdge = this.leftEdge + this.leftRirection;
        this.rightEdge = this.rightEdge + this.rightRirection;

        this.state.map.push(
            new RoadRow(this.leftEdge, this.rightEdge, null)

        );

        if(this.state.map.length > Game.MAP_ROWS){
            this.state.map.splice(0, 1);
        }
    }

    initializeState(){
        this.leftEdge = 0.4;
        this.rightEdge = this.leftEdge + RoadRow.ROAD_MINIMUM_WIDTH * 2;

        this.leftRirection = 0;
        this.rightRirection = 0;
        this.leftDirectionDuration = Math.floor(Math.random() * 5);
        this.rightDirectionDuration = Math.floor(Math.random() * 5);

        for (let index = 0; index < Game.MAP_ROWS; index++) {
            this.addNewMapRow();

        }

    }

}

Game.MAP_ROWS = 25;
