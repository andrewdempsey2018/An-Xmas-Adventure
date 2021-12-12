import k from "./kaboom.js"

loadSprite("effectMoveEnemy", "./assets/sprites/effectMoveEnemy.png");

class effectMoveEnemy {

    constructor(xPos, yPos) {
        this.xPos = xPos;
        this.yPos = yPos;

        this.spr = k.add([
            k.sprite("effectMoveEnemy"),
            k.pos(this.xPos, this.yPos),
            area(),
            "effectMoveEnemy"
        ]);
    }

    /* overide move for this object as it does not move
    we dont want our poly morphic messages causing bugs */
    move() {
    };
}

export default effectMoveEnemy;