import k from "./kaboom.js"
import present from "./present.js";
import Tile from "./tile.js";
import snowmanBig from "./snowmanBig.js";
import effectMoveEnemy from "./effectMoveEnemy.js";

class Level {

    constructor(levelFile) {

        const tileNames = ['tile001', 'tile002', 'tile003', 'tile004', 'tile005',
            'tile006', 'tile007', 'tile008', 'tile009', 'tile010', 'tile011',
            'tile012', 'tile013', 'tile014', 'tile015', 'tile016', 'tile017',
            'tile018', 'tile019', 'tile020'];

        const tileSprites = new Set();

        tileNames.forEach(name => {
            tileSprites.add(loadSprite(name, "./assets/tiles/" + name + ".png"));
        })

        /* these values will never change */
        const TILE_WIDTH = 24;
        const TILE_HEIGHT = 24;

        /* call loadlevel function and deposit
        the level data into relevent variables */

        const solidLayerData = levelFile.layers[0].data;
        const emptyLayerData = levelFile.layers[1].data;
        const objectLayerData = levelFile.layers[2].objects;

        /* read from the level data how many tiles the designer used 
        we need this value in order to ensure the level loads with the
        correct number of rows and columns. */
        let tilesAcross = levelFile.layers[0].width;

        /* row and column are used during the level load procedure
        to determine the exact placement of each tile */
        let row = -1;
        let column = -1;

        this.solidLayer = new Set();
        this.emptyLayer = new Set();

        /* cycle through the loaded level data and for each solidLayer tile,
        add it to the the solidLayer set for rendering */
        solidLayerData.forEach(tile => {
            column += 1;

            if (tile > 0) {
                /* tile - 1 fixes issue where tiles become jumbled */
                this.solidLayer.add(new Tile(column * TILE_WIDTH, row * TILE_HEIGHT, tile - 1))
            }

            if (column === tilesAcross) {
                column = 0;
                row += 1;
            }
        });

        row = -1;
        column = -1;

        emptyLayerData.forEach(tile => {
            column += 1;

            if (tile > 0) {
                /* tile - 1 offsets tile index to correct position */
                this.emptyLayer.add(new Tile(column * TILE_WIDTH, row * TILE_HEIGHT, tile - 1))
            }

            if (column === tilesAcross) {
                column = 0;
                row += 1;
            }
        });

        /* generate a sprite for each tile in the solidLayer set */
        this.emptyLayer.forEach(t => {
            add([
                sprite(tileNames[t.graphic]),
                pos(t.x, t.y),
            ]);
        });

        this.solidLayer.forEach(t => {
            add([
                sprite(tileNames[t.graphic]),
                pos(t.x, t.y),
                area(),
                solid(),
                'solidTile'
            ]);
        });

        /* populate level with entities */

        this.objects = new Set();

        objectLayerData.forEach(entity => {

            /* collectables */
            if(entity.type === 'blue_present') {
                this.objects.add(new present(entity.x, entity.y, entity.type))
            }

            if(entity.type === 'green_present') {
                this.objects.add(new present(entity.x, entity.y, entity.type))
            }

            if(entity.type === 'orange_present') {
                this.objects.add(new present(entity.x, entity.y, entity.type))
            }

            if(entity.type === 'purple_present') {
                this.objects.add(new present(entity.x, entity.y, entity.type))
            }

            /* big snowman enemy */
            if(entity.type === 'snowmanBig') {
                this.objects.add(new snowmanBig(entity.x, entity.y))
            }

            /* invisible colliders for enemies to move back and forth */
            if(entity.type === 'effectMoveEnemy') {
                this.objects.add(new effectMoveEnemy(entity.x, entity.y))
            }
        })

    }

    get getSolidLayer() {
        return this.solidLayer;
    }

    get getEmptyLayer() {
        return this.emptyLayer;
    }

    get getObjects() {
        return this.objects;
    }
}

export default Level;