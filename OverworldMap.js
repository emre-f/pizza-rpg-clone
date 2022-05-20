class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc; // the tiles, the floor

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc; // roofs, treetops, etc.
    }

    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(this.lowerImage, 
                      utils.withGrid(10.5) - cameraPerson.x, // Making sure everything is shifted so that the player is in the center
                      utils.withGrid(6) - cameraPerson.y);
    }

    drawUpperImage(ctx , cameraPerson) {
        ctx.drawImage(this.upperImage, 
                      utils.withGrid(10.5) - cameraPerson.x, 
                      utils.withGrid(6) - cameraPerson.y);
    }

    isSpaceTaken(currentX, currentY, direction) {
        const {x,y} = utils.nextPosition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }

    mountObjects() {
        Object.values(this.gameObjects).forEach(o => {

            //TODO: determine if object should actually mount (picked up item etc.)

            o.mount(this);
        })
    }

    addWall(x, y) {
        this.walls[`${x},${y}`] = true;
    }
    removeWall(x, y) {
        delete this.walls[`${x},${y}`];
    }
    moveWall(wasX, wasY, direction) {
        this.removeWall(wasX, wasY);
        const {x,y} = utils.nextPosition(wasX, wasY, direction);
        this.addWall(x,y);
    }
}

window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: "images/maps/DemoLower.png",
        upperSrc: "images/maps/DemoUpper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(5), // withGrid just multiplies the number by 16 (for smoother grid movement)
                y: utils.withGrid(6),
            }),
            // npc1: new Person({
            //     x: utils.withGrid(7), 
            //     y: utils.withGrid(9),
            //     src: "images/characters/people/npc1.png"
            // })
        },
        walls: {
            //"16,16": true
            [utils.asGridCoords(7,6)] : true // [ ] around the keys make it a dynamic key (will be evaluated)
        }
    },
    Kitchen: {
        lowerSrc: "images/maps/KitchenLower.png",
        upperSrc: "images/maps/KitchenUpper.png",
        gameObjects: {
            hero: new GameObject({
                x: 5,
                y: 6
            }),
            npc1: new GameObject({
                x: 7,
                y: 9,
                src: "images/characters/people/npc1.png"
            })
        }
    },
}