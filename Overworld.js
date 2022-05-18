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
    };
}