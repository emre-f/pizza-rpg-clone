class GameObject {
    constructor(config) {
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
    }

    mount (map) {
        this.isMounted = true;
        map.addWall(this.x, this.y);
    }

    update () {

    }
}