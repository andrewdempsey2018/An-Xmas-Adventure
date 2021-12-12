/* import external classes and instances */
import k from "./kaboom.js"
import Level from "./level.js";
import present from "./present.js";
import Tile from "./tile.js";;
import loadLevel from "./LoadLevel.js";

/* load graphics and other assets */
loadSprite("santa", "./assets/sprites/santa.png");
loadSprite("enemy", "./assets/sprites/enemy.png");

/* define movement speed and jump height for santa
load the sprite and physics properties */
const JUMP_HEIGHT = 500
const WALK_SPEED = 200

loadSound("jump", "./assets/sfx/jump.wav");

let levelFile = await loadLevel('map07');
let level = new Level(levelFile);

/* These are the tiles in each level data structure that are not
equal to 0, ie. tiles that are visible */
//let solidLayer = level.getSolidLayer;
//let semiSolidLayer = level.getsemiSolidLayer;
//let emptyLayer = level.getEmptyLayer;

//add Sprites from here as we want them to walk in front of the backgroun, not be block out by it

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

// camera follows player
santa.onUpdate(() => {
    camPos(santa.pos.x, 216)
    //camPos(santa.pos)
})

// controls
keyDown("left", () => {
    santa.move(-WALK_SPEED, 0);
});

keyDown("right", () => {
    santa.move(WALK_SPEED, 0);
});

//jump
keyPress("space", () => {
    if (santa.isGrounded()) {
        santa.jump(JUMP_HEIGHT);
        play("jump");
    }
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



