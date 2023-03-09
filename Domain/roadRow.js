export class RoadRow {

    constructor(leftEdge, rightEdge, obstacle){

        if(leftEdge < 0.1) leftEdge = 0.1;
        if(rightEdge > 0.9) rightEdge = 0.9;

        if(rightEdge - leftEdge < RoadRow.ROAD_MINIMUM_WIDTH){
            rightEdge = leftEdge + RoadRow.ROAD_MINIMUM_WIDTH;
        }
        this.leftEdge = leftEdge;
        this.rightEdge = rightEdge;

        if(obstacle){
            if(obstacle <= leftEdge || obstacle >= rightEdge){
                obstacle = null;
            }
        }
        this.obstacle = obstacle;


    }


}

RoadRow.ROAD_MINIMUM_WIDTH = 0.2;