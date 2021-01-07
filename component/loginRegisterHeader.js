const style = `
    * {
    margin: 0;
    padding: 0;
}

.container {
    background-color: #ff6600;
    width: 100%;
    height: 10vh;
    display: flex;
    position: fixed;
    
}

.brand {
    text-algin: center;
    margin-left: 5px;
    width:60%;
    font-size: 30px;
}
`
class loginRegisterHeader extends HTMLElement {
    constructor(){
        super();
        this._shadowDom = this.attachShadow({mode: "open"})
    }
    connectedCallback(){
        this._shadowDom.innerHTML=`
        <style>
            ${style}
        </style>
        <div class="container">
            <div class="brand">LIVE CHAT</div>
        </div>
        `
    }
}
window.customElements.define("lr-header", loginRegisterHeader)