/* import external classes and instances */
import k from "./kaboom.js"
import Level from "./level.js";
import present from "./present.js";
import Tile from "./tile.js";
import loadLevel from "./LoadLevel.js";
import snowmanBig from "./snowmanBig.js";
import effectMoveEnemy from "./effectMoveEnemy.js";

/* load graphics and other assets */
loadSprite("effectMoveEnemy", "./assets/sprites/effectMoveEnemy.png");

/* backgrounds for levels */
loadSprite("countryside_night", "./assets/backgrounds/countryside_night.png");

/* get the santa frames file and slice it in 7 pieces
the frames file is 336 pixels wide so this amounts to 7 frames
each 48 pixels wide. Give each indiviual animation sesquence a name
so we can refer to it in code */
loadSprite("santa", "./assets/sprites/santa/santa_frames.png", {
    sliceX: 7,
    // Define animations
    anims: {
        "idle": 0,
        "run": {
            // Starts from frame 0, ends at frame 2
            from: 0,
            to: 2,
            to: 0,
            to: 1,
            // Frame per second
            speed: 8,
            loop: true,
        },
        "jump_up": 3,
        "fall": 4,
        "attack": 5,
        "hit": 6
    }
})

/* define movement speed and jump height for santa
load the sprite and physics properties */
const JUMP_HEIGHT = 500
const WALK_SPEED = 200

/* sound effects */
loadSound("jump", "./assets/sfx/jump.wav");
loadSound("pickup", "./assets/sfx/pickup.wav");

/* music */
loadSound("music", "./assets/music/jingle.mp3");

/* the levels music file */
const music = play("music", {
    loop: true
})

let levelFile = await loadLevel('level1');
let level = new Level(levelFile);

/* These are the tiles in each level data structure that are not
equal to 0, ie. tiles that are visible */
//let solidLayer = level.getSolidLayer;
//let semiSolidLayer = level.getsemiSolidLayer;
//let emptyLayer = level.getEmptyLayer;

/* add backgrounds first to scene so that all other assets asre drown on top of bg */
const background1 = add([
    sprite("countryside_night"),
    pos(0, 0),
    fixed(),
    z(-2)
]);

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

/* santa not moving/jumping, play idle animation or else play running animation */
santa.onGround(() => {
    if (!isKeyDown("left") && !isKeyDown("right")) {
        santa.play("idle")
    } else {
        santa.play("run")
    }
})

onKeyRelease(["left", "right"], () => {
    // Only reset to "idle" if player is not holding any of these keys
    if (!isKeyDown("left") && !isKeyDown("right")) {
        santa.play("idle")
    }
})

// camera follows player
santa.onUpdate(() => {
    camPos(santa.pos.x, 216)
    //camPos(santa.pos)
})

let attack = false;

// controls
keyDown("left", () => {
    santa.flipX(true); //make santa sprite face left
    santa.move(-WALK_SPEED, 0);

    if (santa.isGrounded() && santa.curAnim() !== "run") {
        santa.play("run")
    }
});

keyDown("right", () => {
    santa.flipX(false); //make santa sprite face right
    santa.move(WALK_SPEED, 0);

    if (santa.isGrounded() && santa.curAnim() !== "run") {
        santa.play("run")
    }
});

//jump
keyPress("space", () => {
    if (santa.isGrounded()) {
        santa.jump(JUMP_HEIGHT);
        play("jump"); //jump sound
        santa.play("jump_up") //show jumping animation
    }
});

/* Santa touches a present, make it disapear, add to score */
onCollide("santa", "present", (santa, present) => {
    destroy(present);
    play("pickup");
})

/* call the various objects movement methods */

action(() => {
    level.getObjects.forEach(obj => {
        obj.move();
    })
})

/* animate snowmen */
const snowMen = get("snowmanBig");
snowMen.forEach(snowMan => {
    snowMan.play('walk');
})

onCollide("santa", "snowmanBig", () => {
    if (!attack) {
        santa.pos.x = 400;
        santa.pos.y = 300;
    }
})

/* Santa can destroy snowmen by jumping on their heads */
onCollide("santa", "snowmanBig", (stnick, snowman) => {
    if (attack) {
        addKaboom(snowman.pos)
        destroy(snowman);
    
    }
    //play("pickup");
})

keyPress("z", () => {
    santa.play("attack");
    attack = true;
});

onKeyRelease("z", () => {
    santa.play("idle")
    attack = false;
})

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





