const style =``
class addNewConver extends HTMLElement {
    constructor() {
        super();
        this._shadowDom = this.attachShadow({mode: "open"})
    }
    connectedCallback(){
        this._shadowDom.innerHTML =`
            <chat-header></chat-header>
            <list-friend></list-friend>
        `
    }
}
window.customElements.define("add-conver", addNewConver);