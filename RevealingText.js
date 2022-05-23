class RevealingText {
    constructor(config) {
        this.element = config.element;
        this.text = config.text;
        this.speed = config.speed || 50;

        this.timeout = null;
        this.isDone = false; // done showing message
    }

    revealOneCharacter(list) {
        const next = list.splice(0,1)[0]; // get first element and remove it
        next.span.classList.add("revealed");

        if(list.length > 0) {
            this.timeout = setTimeout(() => {
                this.revealOneCharacter(list);
            }, next.delayAfter)
        } else {
            this.isDone = true;
        }
    }

    // Fast forward to finishing the text by pressing enter etc.
    warpToDone() {
        clearTimeout(this.timeout);
        this.isDone = true;

        // Make all spans visible at once
        this.element.querySelectorAll("span").forEach(s => {
            s.classList.add("revealed");
        })
    }

    init () {
        let characters = [];
        this.text.split("").forEach(character => {
            // Create each span, add to element DOM
            let span = document.createElement("span");
            span.textContent = character;
            this.element.appendChild(span);
        
            // Add this span to our internal array
            characters.push({
                span,
                delayAfter: character === " " ? 0 : this.speed // Don't wait for space, otherwise wait the usual speed time
            })
        })

        this.revealOneCharacter(characters);
    }
}