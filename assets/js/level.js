import k from "./kaboom.js"

import Tile from "./tile.js";

class Level {

    constructor(levelFile) {

        /* these values will never change */
        const TILE_WIDTH = 24;
        const TILE_HEIGHT = 24;

        /* call loadlevel function and deposit
        the level data into a variable */

        const solidLayerData = levelFile.layers[0].data;

        /* read from the level data how many tiles the designer used 
        we need this value in order to ensure the level loads with the
        correct number of rows and columns. */
        let tilesAcross = levelFile.layers[0].width;

        /* row and column are used during the level load procedure
        to determine the exact placement of each tile */
        let row = -1;
        let column = -1;

        this.solidLayer = new Set();

        /* cycle through the loaded level data and for each solidLayer tile,
        add it to the the solidLayer set for rendering */
        solidLayerData.forEach(tile => {
            column += 1;

            if (tile > 0) {
                this.solidLayer.add(new Tile(column * TILE_WIDTH, row * TILE_HEIGHT))
            }

            if (column === tilesAcross) {
                column = 0;
                row += 1;
            }
        });

        /* generate a sprite for each tile in the solidLayer set */
        this.solidLayer.forEach(t => {
            add([
                sprite("tile"),
                pos(t.x, t.y),
                area(),
                solid()
            ]);
        });
    }

    get getSolidLayer() {
        return this.solidLayer;
    }
}

export default Level;