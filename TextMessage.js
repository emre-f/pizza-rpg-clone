class TextMessage {
    constructor({ text, onComplete }) {
        this.text = text;
        this.onComplete = onComplete;
        this.element = null; // The element that we'll create to have the text (div)
    }

    createElement() {
        //Create the element
        this.element = document.createElement("div");
        this.element.classList.add("TextMessage");

        this.element.innerHTML = (`
            <p class="TextMessage_p"></p>
            <button class="TextMessage_button">Next</button>
        `)

        // Init the typewriter effect
        this.revealingText = new RevealingText({
            element: this.element.querySelector(".TextMessage_p"),
            text: this.text,
        })

        this.element.querySelector("button").addEventListener("click", () => {
            this.done(); 
        })

        this.actionListener = new KeypressListener("Enter", () => {
            this.done();
        })
    }

    done () {
        // If done revealing, move on to the next behavior
        if(this.revealingText.isDone) {
            this.element.remove();
            this.actionListener.unbind(); // Because we will be getting rid of the component, so we should stop listening to it
            this.onComplete();
        // If not finished revealing, skip to the end (reveal the whole message)   
        } else {
            this.revealingText.warpToDone();
        }
    }

    init(container) { // Container is the HTML element that we'll create (like a div)
        this.createElement();
        container.appendChild(this.element);
        this.revealingText.init();
    }
}