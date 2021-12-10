/* import external classes and instances */
import k from "./kaboom.js"
import pickup from "./pickup.js"
import loadLevel from "./LoadLevel.js";

/* load graphics and other assets */
loadSprite("santa", "./assets/sprites/santa.png");
loadSprite("enemy", "./assets/sprites/enemy.png");

const tile = loadSprite("tile", "./assets/sprites/tile.png");

/* define movement speed and jump height for santa
load the sprite and physics properties */
const JUMP_HEIGHT = 1320
const WALK_SPEED = 200

/* Create santa sprite and add it to the game instance
body() means he will collide with the level and be affected by gravity
area() gives the sprite collision detection */
const santa = add([
    sprite("santa"),
    area(),
    pos(400, 300),
    body(),
    "santa"
]);

loadSound("jump", "./assets/sfx/jump.wav");

/* call loadlevel function and deposit
the level data into a variable */
const level = await loadLevel();
const levelData = level.layers[0].data;

/* explicitly declare level constants
so we can use them for loading the level */
const TILE_WIDTH = 24;
const TILE_HEIGHT = 24;
const TILES_ACROSS = 135;

/* row and column are used during the level load procedure
to determine the exact placement of each tile */
let row = -1;
let column = -1;

/* tile object, x,y position as well as its type ie. graphical style */
class Tile {
    constructor(xPos, yPos) {
        this.x = xPos;
        this.y = yPos;
        this.type = 1;
    }
}

/* These are the tiles in each level data structure that are not
equal to 0, ie. tiles that are visible */
const visibleTiles = new Set();

/* cycle through the loaded level data and for each visible tile,
add it to the the visibleTiles set for rendering */
levelData.forEach(tile => {
    column += 1;

    if (tile > 0) {
        visibleTiles.add(new Tile(column * TILE_WIDTH, row * TILE_HEIGHT))
    }

    if (column === TILES_ACROSS) {
        column = 0;
        row += 1;
    }
});

// camera follows player
santa.onUpdate(() => {
    camPos(santa.pos)
})

/* generate a sprite for each tile in the visibleTiles set */
visibleTiles.forEach(t => {
    add([
        sprite("tile"),
        pos(t.x, t.y),
        area(),
        solid()
    ]);
});

// controls
keyDown("left", () => {
    santa.move(-WALK_SPEED, 0);
});

keyDown("right", () => {
    santa.move(WALK_SPEED, 0);
});

//jump
keyPress("space", () => {
    santa.jump(JUMP_HEIGHT);
    play("jump");
});

/* TO DO collectables and enemies
const ENEMY_SPEED = 50;
let enemySpeedX = 10;

const enemy = add([
    sprite("enemy"),
    area(),
    pos(700, 550),
    "enemy"
]);

let colls = new Set();
for (let i = 0; i < 4; i++) {
    //colls.add(new pickup(rand(0, 700), rand(0, 500), rand(10, 530)));
};


action(() => {
    enemy.move(enemySpeedX, -ENEMY_SPEED);
    enemySpeedX += 10;

    if (enemy.screenPos().y <= -40) {
        enemy.moveTo(rand(40, 700), 600);

        enemySpeedX = 10;
    }

    if (enemy.screenPos().x >= 800) {

        enemySpeedX = enemySpeedX * -1;
    }

    colls.forEach(coll => {
        coll.move();
    });

});
*/



