import k from "./kaboom.js"
import pickup from "./pickup.js"
import loadLevel from "./LoadLevel.js";

loadSprite("santa", "./assets/sprites/santa.png");
loadSprite("enemy", "./assets/sprites/enemy.png");



const tile = loadSprite("tile", "./assets/sprites/tile.png");

const SANTA_SPEED = 200;

const santa = add([
    sprite("santa"),
    area(),
    pos(400, 300),
    "santa"
]);

loadSound("jump", "./assets/sfx/jump.wav");


const level = await loadLevel();
const levelData = level.layers[0].data;

const TILE_WIDTH = 32;
const TILE_HEIGHT = 32;
const TILES_ACROSS = 75;

let row = -1;
let column = -1;

class Tile {
    constructor(xPos, yPos) {
        this.x = xPos;
        this.y = yPos;
        this.type = 1;
    }
}

const wholeLevel = new Set();

levelData.forEach(tile => {
    column += 1;

    if (tile > 0) {
        wholeLevel.add(new Tile(column * TILE_WIDTH, row * TILE_HEIGHT))
    }

    if (column === TILES_ACROSS) {
        column = 0;
        row += 1;
    }
});

wholeLevel.forEach(t => {

    add([
        sprite("tile"),
        pos(t.x, t.y)
    ]);
});

// controls
keyDown("left", () => {
    santa.move(-SANTA_SPEED, 0);
});

keyDown("right", () => {
    santa.move(SANTA_SPEED, 0);
});

//jump
keyPress("z", () => {
    play("jump");
});

//enemys
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



