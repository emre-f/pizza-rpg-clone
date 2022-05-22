class GameObject {
    constructor(config) {
        this.id = null;
        
        this.isMounted = false;

        // Position
        this.x = config.x || 0; 
        this.y = config.y || 0;
        this.direction = config.direction || "down"; // Which direction Person is looking/moving towards
        
        // Appearance
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "images/characters/people/hero.png",
        });

        //Behavior loop
        this.behaviorLoop = config.behaviorLoop || [];
        this.behaviorLoopIndex = 0; // which part are we at
    }

    // Adds us to the scene
    mount (map) {
        this.isMounted = true;
        map.addWall(this.x, this.y);

        // If we have a behavior, kick off after a short delay
        setTimeout(() => {
            this.doBehaviorEvent(map);
        }, 10);
    }

    update () {

    }

    async doBehaviorEvent(map) {
        // If cutscene is playing, or object has no behaviors don't play anything
        if(map.isCutscenePlaying || this.behaviorLoop.length === 0 || this.isStanding) {
            return;
        }

        // Setting up event with relevant info
        let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
        eventConfig.who = this.id;

        // Create event instance of our next even config
        const eventHandler = new OverworldEvent({ map, event: eventConfig }) //OverworldEvents: movement, music change, text pop-up etc.
        await eventHandler.init(); // await to fully wait the action to finish

        // Move on to the next behavior
        this.behaviorLoopIndex += 1;
        if (this.behaviorLoopIndex === this.behaviorLoop.length) {
            this.behaviorLoopIndex = 0;
        }

        // Do behavior again
        this.doBehaviorEvent(map);
    }
}