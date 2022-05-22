class OverworldEvent {
    constructor({ map, event }) {
        this.map = map;
        this.event = event;
    }

    stand(resolve) {
        const who = this.map.gameObjects[ this.event.who ];
        who.startBehavior({
            map: this.map
        }, {
            type: "stand",
            direction: this.event.direction,
            time: this.event.time
        })

        // Set up handler to complete when correct person is done walking, then resolve the event
        const completeHandler = e => {
            if(e.detail.whoId === this.event.who) { // Make sure correct player/npc
                document.removeEventListener("PersonStandComplete", completeHandler);
                resolve();
            }
        }

        document.addEventListener("PersonStandComplete", completeHandler) // When event fires, fire completeHandler
    }

    walk(resolve) {
        const who = this.map.gameObjects[ this.event.who ];
        who.startBehavior({
            map: this.map
        }, {
            type: "walk",
            direction: this.event.direction,
            retry: true // If walk fails (due to collision etc.), retry in a while
        })

        // Set up handler to complete when correct person is done walking, then resolve the event
        const completeHandler = e => {
            if(e.detail.whoId === this.event.who) { // Make sure correct player/npc
                document.removeEventListener("PersonWalkingComplete", completeHandler);
                resolve();
            }
        }

        document.addEventListener("PersonWalkingComplete", completeHandler) // When event fires, fire completeHandler
    }

    textMessage(resolve) {

        if (this.event.faceHero) {
            const obj = this.map.gameObjects[this.event.faceHero];
            obj.direction = utils.oppositeDirection(this.map.gameObjects["hero"].direction);
        }

        const message = new TextMessage({
            text: this.event.text,
            onComplete: () => resolve() // When message is done being acknowledged by the player
        })
        message.init( document.querySelector(".game-container") )
    }

    changeMap(resolve) {
        this.map.overworld.startMap( window.OverworldMaps[this.event.map] );
        resolve();
    }

    init() {
        return new Promise(resolve => { // resolve is called when the event is done (eg. done moving to the next cell)
            this[this.event.type](resolve)
        })
    }
}