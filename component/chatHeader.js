const style =`
    * {
    margin: 0;
    padding: 0;
}

.container {
    height: 8vh;
    background-color: #ff6600;
    display: flex;
    border-bottom: 2px solid #1a1a1a;
    box-shadow: 0 1px #1a1a1a;
    justify-content: space-between;
}

.brand {
    font-size: 2rem;
    text-align: center;
    width: 20%;
    padding-top: 10px;
    border-right: 3px solid #333333;
}

.brand:hover {
    cursor: pointer;
}

.search {
    padding-left: 2rem;
    padding-top: 15px;
}

.user {
    padding-top: 17px;
    order: 2;
    display: flex;
}

.avatar {
    margin-right: 10px;
}

.name {
    margin-right: 10px;
}

.notify {
    display: flex;
    margin-right: 10px;
}

.number {
    color: #006600;
}

.log-out {
    margin-right: 10px;
}

img {
    width: 28px;
    height: 28px;
}
.avatar, .name, .log-out:hover{
    cursor: pointer;
}
`
class chatHeader extends HTMLElement {
    constructor(){
        super();
        this._shadowDom = this.attachShadow({mode:"open"})
    }
    connectedCallback(){
        this._shadowDom.innerHTML=`
        <style>
            ${style}
        </style>
            <div class="container">
        <div class="brand">LIVE CHAT</div>
        <div class="user">
            <div class="avatar">
                <img src="./someImg/clearAvatar.png">
            </div>
            <div class="name">Name</div>
            <div class="notify">
                <img src="./someImg/notyfiIcon.png" alt="">
                <div class="number">1</div>
            </div>
            <div class="log-out">Logout</div>
        </div>
    </div>
        `
    }
}
window.customElements.define("chat-header", chatHeader);