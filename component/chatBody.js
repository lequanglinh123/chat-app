const style =`
    .container {
        height:80vh;
        display:flex;
    }
    .list-conversation{
        width: 20%;
        border: 2px solid #333333;
        padding-bottom: 10px;
    }
    .chat-area{
        width:80%;
    }
`
class chatBody extends HTMLElement {
    constructor() {
        super();
        this._shadowDom = this.attachShadow({mode:"open"})
    }
    connectedCallback(){
        this._shadowDom.innerHTML =`
        <style>
            ${style}
        </style>
        <div class="container">
            <div class="list-conversation">
                <list-conversation></list-conversation>
            </div>
            <div class="chat-area">
                <chat-area></chat-area>
            </div>
        </div>
        `
    }
}
window.customElements.define("chat-body", chatBody);