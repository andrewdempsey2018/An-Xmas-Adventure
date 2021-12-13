import k from "./kaboom.js"

/* load image and extract frames */
loadSprite("snowmanMinnion", "./assets/sprites/snowmen/minionSnowmanFrames.png", {
    sliceX: 4,
    // Define animations
    anims: {
        "idle": 0,
        "walk": {
            // Starts from frame 0, ends at frame 2
            from: 0,
            to: 3,
            speed: 3,
            loop: true,
        },
    }
})


class snowmanMinnion {

    constructor(xPos, yPos) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.health = 2;
        this.xSpeed = 50;

        this.walkDistance = 0;
        this.flipValue = true;

        this.spr = k.add([
            k.sprite("snowmanMinnion"),
            k.pos(this.xPos, this.yPos),
            k.origin("bot"),
            k.area(),
            k.body(),
            "snowmanMinnion"
        ]);
    }

    move() {
        this.spr.move(this.xSpeed, 0);

        this.walkDistance += 1;

        if (this.walkDistance >= 50) {
            this.walkDistance = 0;
            this.xSpeed *= -1;
            this.flipValue = !this.flipValue;
            this.spr.flipX(this.flipValue);
        }
    };
}

export default snowmanMinnion;