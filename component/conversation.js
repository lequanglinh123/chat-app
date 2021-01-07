const style =`
* {
    margin: 0;
    padding: 0;
}

.container {
    display: flex;
    border-bottom: 1px solid #333333;
    width: 100%;
    margin-bottom: 20px
}

.container:hover {
    cursor: pointer;
}

.avatar {
    width: 30px;
    height: 30px;
    border: 1px solid #333333;
    border-radius: 30px;
}

.conversation {
    margin-left: 10px;
}
`
class Conversation extends HTMLElement {
    constructor(){
        super();
        this._shadowDom = this.attachShadow({mode:"open"})
        this.firstRun = true;
    }
    connectedCallback(){
        this.name = this.getAttribute("name")
        this.createBy = this.getAttribute("createby")|| ""
        this.lastMessage = this.getAttribute("lastmessage")|| ""
        this.id = this.getAttribute("id")
        this._shadowDom.innerHTML =`
        <style>
            ${style}
        </style>
        <div class="container" id ="${this.id}">
            <img class ="avatar" src="./someImg/clearAvatar.png" alt="">
            <div class="conversation">
                <div class="name">${this.name}</div>
                <div class="last-mess" id="${this.createBy}">${this.lastMessage}</div>
            </div>
        </div>
        `
    }
    static get observedAttributes() {
        return ['lastmessage']
    }
    attributeChangedCallback(name, oldValue, newValue ) {
        if(this.firstRun){
            this.firstRun = false;
            return;
        }else{
            if(name === 'lastmessage') {
            this._shadowDom.querySelector(".last-mess").innerHTML = `${newValue}`;
        }
        }
    }
}
window.customElements.define("each-conversation", Conversation)