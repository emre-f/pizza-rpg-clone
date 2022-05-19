class Overworld {
    constructor (config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d"); // drawing attributes of the canvas (?)
        this.map = null;
    }

    startGameLoop () {
        const step = () => {

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clearing the canvas (so we re-draw everytime)

            //Draw Lower Layer
            this.map.drawLowerImage(this.ctx);

            //Draw gameobjects
            Object.values(this.map.gameObjects).forEach(object => {
                object.update({
                    arrow: this.directionInput.direction
                });
                object.sprite.draw(this.ctx);
            })

            //Draw Upper Layer
            this.map.drawUpperImage(this.ctx);

            requestAnimationFrame(() => { // Web browser calls this function every time a new frame begins
                step();
            })
        }
        step(); // our game-loop function
    }

    init () {
        this.map = new OverworldMap(window.OverworldMaps.DemoRoom);

        this.directionInput = new DirectionInput(); // Getting user input
        this.directionInput.init();

        this.startGameLoop();
    };
}