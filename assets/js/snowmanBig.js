import k from "./kaboom.js"

/* load image and extract frames */
loadSprite("snowmanBig", "./assets/sprites/snowmen/evil-snowman-frame1.png")

class snowmanBig {

    constructor(xPos, yPos) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.health = 2;

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
        /*this.spr.move(this.speed, this.speed);

        if (this.spr.screenPos().y >= 600 || this.spr.screenPos().x >= 800) {
            this.spr.moveTo(rand(40, 700), -40);
            this.speed = rand(10, 530);
        }*/
    };
}

export default snowmanBig;