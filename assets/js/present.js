import k from "./kaboom.js"

loadSprite("present", "./assets/sprites/presents_collect/blue_present.png");

class present {

    constructor(xPos, yPos, speed) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.speed = speed;

        this.spr = k.add([
            k.sprite("present"),
            k.area(),
            k.pos(this.xPos, this.yPos),
            "present"
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

export default present;