class Overworld {
    constructor (config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d"); // drawing attributes of the canvas (?)
    }

    init () {
        const image = new Image();
        image.onload = () => {
            this.ctx.drawImage(image, 0, 0); // which image to get pixels from and x, y coordinates
        };
        image.src = "images/maps/DemoLower.png" // assign source to image

        const x = 5;
        const y = 6;

        const shadow = new Image();
        shadow.onload = () => {
            this.ctx.drawImage(
                shadow, // image we are drawing from
                0, // starting point of left crop
                0, // the top cut
                32, // pixel width of cut
                32, // pixel height of cut
                x * 16 - 8, // x-coord of where we are drawing [x16 because each grid is 16x16 pixels]
                y * 16 + 18, // y-coord of where we are drawing
                32, // the actual scale we'll draw in (can be used to scale up/down) [width]
                32 // [height]
            );
        };
        shadow.src = "images/characters/shadow.png"

        const hero = new Image();
        hero.onload = () => {
            this.ctx.drawImage(
                hero, // image we are drawing from
                0, // starting point of left crop
                0, // the top cut
                32, // pixel width of cut
                32, // pixel height of cut
                x * 16 - 8, // x-coord of where we are drawing [x16 because each grid is 16x16 pixels]
                y * 16 + 18, // y-coord of where we are drawing
                32, // the actual scale we'll draw in (can be used to scale up/down) [width]
                32 // [height]
            );
        };
        hero.src = "images/characters/people/hero.png"
    };
}