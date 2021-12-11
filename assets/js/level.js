import k from "./kaboom.js"

import Tile from "./tile.js";

class Level {

    constructor(levelFile) {

        const tileNames = ['placeholder', 'grass-ground-snow', 'ground-ice-substrate', 'ground-ice-top', 'ground-substrate', 'ice-edge-left',
            'ice-edge-right', 'ice-ground-substrate', 'ice-ground-top', 'ice-platform-left', 'ice-platform-right', 'ice-platform-top',
            'ice-substrate', 'ice-top', 'snow-grass-edge-left', 'snow-grass-edge-right', 'snow-grass-top', 'snow-ground-grass',
            'snow-ground-left', 'snow-ground-right', 'snow-ground-top'];

        const tileSprites = new Set();

        tileNames.forEach(name => {
            tileSprites.add(loadSprite(name, "./assets/tiles/" + name + ".png"));
        })

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
                this.solidLayer.add(new Tile(column * TILE_WIDTH, row * TILE_HEIGHT, tile))
            }

            if (column === tilesAcross) {
                column = 0;
                row += 1;
            }
        });

        /* generate a sprite for each tile in the solidLayer set */
        this.solidLayer.forEach(t => {
            add([
                sprite(tileNames[t.graphic]),
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