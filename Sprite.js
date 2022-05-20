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
            "idle-down" : [ [0, 0] ], // Will play these frames (eg. [0, 0])
            "idle-right": [ [0, 1] ],
            "idle-up"   : [ [0, 2] ],
            "idle-left" : [ [0, 3] ],
            "walk-down" : [ [1, 0], [0, 0], [3, 0], [0, 0] ],
            "walk-right": [ [1, 1], [0, 1], [3, 1], [0, 1] ],
            "walk-up"   : [ [1, 2], [0, 2], [3, 2], [0, 2] ],
            "walk-left" : [ [1, 3], [0, 3], [3, 3], [0, 3] ],
        }
        this.currentAnimation = config.currentAnimation || "idle-down"; // current animation
        this.currentAnimationFrame = 0; // current frame

        this.animationFrameLimit = config.animationFrameLimit || 8; // stay at a frame for this much frames (lower number -> faster animation)
        this.animationFrameProgress = this.animationFrameLimit; // Keeping track of how far are we along the current frame

        // Reference the game object
        this.gameObject = config.gameObject;
    }

    get frame () {
        return this.animations[this.currentAnimation][this.currentAnimationFrame] // Returning the current frame
    }

    setAnimation (key) { // Setting our animation (as direction changes etc.)
        if (this.currentAnimation != key) {
            this.currentAnimation = key; // Change to the new key
            this.currentAnimationFrame = 0; // Start from the 0th (first) frame
            this.animationFrameProgress = this.animationFrameLimit; // Set the frame progress to 0
        }
    }

    updateAnimationProgress () { // Updating/progressing our animation frames
        // Downtick frame progress
        if (this.animationFrameProgress > 0) {
            this.animationFrameProgress -= 1;
            return;
        }

        // Reset the counter
        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame += 1;
        if (this.frame === undefined) { // Once we are out of bounds (went through all the frames)
            this.currentAnimationFrame = 0; // Reset back to first frame
        }
    }

    draw(ctx, cameraPerson) {
        const x = this.gameObject.x - 8 + utils.withGrid(10.5) - cameraPerson.x;
        const y = this.gameObject.y - 18 + utils.withGrid(6) - cameraPerson.y;
        
        this.isShadowLoaded && ctx.drawImage(this.shadow, x, y); // Draw the shadow first

        const [frameX, frameY] = this.frame;

        this.isLoaded && ctx.drawImage( // Make sure sprite is loaded before continuing
            this.image,
            frameX * 32, frameY * 32, // coordinates of where to start clipping
            32, 32, // width and height of image
            x, y, // coordinates of where to place the image
            32, 32 // width/height of image to use (can use to stretch image etc.)
        )

        this.updateAnimationProgress();
    }
}