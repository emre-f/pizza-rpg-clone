class Sprite {
    constructor(config) {

        // Set up the image
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        }

        // Shadow
        this.shadow = new Image();
        this.useShadow = true; //config.useShadow || false
        if(this.useShadow) {
            this.shadow.src = "images/characters/shadow.png";
        }
        this.shadow.onload = () => {
            this.isShadowLoaded = true;
        }

        // Configuring animation and initial state
        this.animations = config.animations || {
            idleDown: [ // Idle animations
                [0, 0] // Will play these frames
            ]
        }
        this.currentAnimation = config.currentAnimation || "idleDown"; // current animation
        this.currentAnimationFrame = 0; // current frame

        // Reference the game object
        this.gameObject = config.gameObject;
    }

    draw(ctx) {
        const x = this.gameObject.x * 16 - 8;
        const y = this.gameObject.y * 16 - 18;
        
        this.isShadowLoaded && ctx.drawImage(this.shadow, x, y); // Draw the shadow first

        this.isLoaded && ctx.drawImage( // Make sure sprite is loaded before continuing
            this.image,
            0, 0,
            32, 32,
            x, y,
            32, 32
        )
    }
}