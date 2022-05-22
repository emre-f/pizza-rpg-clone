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
            <p class="TextMessage_p">${this.text}</p>
            <button class="TextMessage_button">Next</button>
        `)
    }

    init(container) { // Container is the HTML element that we'll create (like a div)
        this.createElement();
        container.appendChild(this.element);
    }
}