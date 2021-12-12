import k from "./kaboom.js"

loadSprite("blue_present", "./assets/sprites/presents_collect/blue_present.png");
loadSprite("green_present", "./assets/sprites/presents_collect/green_present.png");
loadSprite("purple_present", "./assets/sprites/presents_collect/purple_present.png");
loadSprite("orange_present", "./assets/sprites/presents_collect/orange_present.png");

class present {

    constructor(xPos, yPos, colour) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.colour = colour;

        this.spr = k.add([
            k.sprite(colour),
            k.area(),
            k.pos(this.xPos, this.yPos),
            k.origin("bot"),
            "present"
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

export default present;