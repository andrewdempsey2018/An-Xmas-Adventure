import k from "./kaboom.js"

/* tile object, x,y position as well as its type ie. graphical style */
class Tile {
    constructor(xPos, yPos) {
        this.x = xPos;
        this.y = yPos;
        this.type = 1;
    }
}

export default Tile;