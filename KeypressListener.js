class KeypressListener {
    constructor(keyCode, callback) {
        let keySafe = true;
        this.keydownFunction = function(event) {
            if (event.code === keyCode) {
                if (keySafe) { // key safe means key is usable
                    keySafe = false;
                    callback();
                }
            }
        };
        this.keyupFunction = function(event) {
            if (event.code === keyCode) {
                keySafe = true; // to become use-able again the key must be lifted
            }
        };

        document.addEventListener("keydown", this.keydownFunction);
        document.addEventListener("keyup", this.keyupFunction);
    }

    unbind() {
        document.removeEventListener("keydown", this.keydownFunction);
        document.removeEventListener("keyup", this.keyupFunction);
    }
}