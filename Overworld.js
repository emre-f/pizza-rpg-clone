class Overworld {
    constructor (config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d"); // drawing attributes of the canvas (?)
        this.map = null;
    }

    startGameLoop () {
        const step = () => {

            // Clearing the canvas (so we re-draw everytime)
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 

            // Establishing camera-person (the centre object, the player)
            const cameraPerson = this.map.gameObjects.hero;

            // Update all objects first (not rendering yet, just position) (we draw them below, see //Draw gameobjects)
            Object.values(this.map.gameObjects).forEach(object => {
                object.update({
                    arrow: this.directionInput.direction,
                    map: this.map,
                });
            });

            //Draw Lower Layer
            this.map.drawLowerImage(this.ctx, cameraPerson);

            //Draw gameobjects
            Object.values(this.map.gameObjects).forEach(object => {
                object.sprite.draw(this.ctx, cameraPerson);
            });

            //Draw Upper Layer
            this.map.drawUpperImage(this.ctx, cameraPerson);

            requestAnimationFrame(() => { // Web browser calls this function every time a new frame begins
                step();
            })
        }
        step(); // our game-loop function
    }

    init () {
        this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
        this.map.mountObjects();

        this.directionInput = new DirectionInput(); // Getting user input
        this.directionInput.init();

        this.startGameLoop();
    };
}