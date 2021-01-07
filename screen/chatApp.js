const style = `
    *{
        margin:0;
        padding:0;
    }
`
class ChatApp extends HTMLElement {
    constructor(){
        super();
        this.shadowDom = this.attachShadow({mode:"open"})
    }
    connectedCallback(){
        this.shadowDom.innerHTML =`
        <style>
            ${style}
        </style>
        <chat-header></chat-header>
        <chat-body></chat-body>
        `
    }
}
window.customElements.define("chat-app", ChatApp)