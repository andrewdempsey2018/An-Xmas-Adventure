import k from "./kaboom.js"

/* load image and extract frames */
loadSprite("snowmanBig", "./assets/sprites/snowmen/evilSnowmanFrames.png", {
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
        "hit": 3
    }
})



class snowmanBig {

    constructor(xPos, yPos) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.health = 2;
        this.xSpeed = 50;

        this.walkDistance = 0;
        this.flipValue = true;

        this.spr = k.add([
            k.sprite("snowmanBig"),
            k.pos(this.xPos, this.yPos),
            k.origin("bot"),
            k.area(),
            k.body(),
            "snowmanBig"
        ]);

       
    }

    move() {
        this.spr.move(this.xSpeed, 0);

        this.walkDistance += 1;

        if (this.walkDistance >= 250) {
            this.walkDistance = 0;
            this.xSpeed *= -1;
            this.flipValue = !this.flipValue;
            this.spr.flipX(this.flipValue);
        }

        

    };

}

export default snowmanBig;