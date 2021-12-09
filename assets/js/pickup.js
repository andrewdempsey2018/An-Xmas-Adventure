import k from "./kaboom.js"

loadSprite("pickup", "./assets/sprites/present.png");

class pickup {

    constructor(xPos, yPos, speed) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.speed = speed;

        this.spr = k.add([
            k.sprite("pickup"),
            k.area(),
            k.pos(this.xPos, this.yPos),
            "pickup"
        ]);
    }

    move() {
        this.spr.move(this.speed, this.speed);

        if (this.spr.screenPos().y >= 600 || this.spr.screenPos().x >= 800) {
            this.spr.moveTo(rand(40, 700), -40);
            this.speed = rand(10, 530);
        }
    };
}

export default pickup;