import {getItemLocalStorage, updateMessage, getDataFromDoc} from '../utils.js'
const style =`
* {
    margin: 0;
    padding: 0;
}

.container {
    width: 100%;
    border: 1px solid #333333;
}

.title {
    display: flex;
    border-bottom: 1px solid #333333;
}

.name {
    text-align: center;
    width: 96%;
    font-size: 47px;
}

.more {
    height: 30px;
    position: relative;
    display: inline-block;
}

.more:hover {
    cursor: pointer;
}

.select {
    display: none;
}

.select .rename {
    border: 1px solid #333333;
    position: relative;
}

.select .delete {
    border: 1px solid #333333;
}

.delete:hover {
    background-color: #cccccc;
}

.rename:hover {
    background-color: #cccccc;
}

.more:hover .select {
    display: block;
    z-index: 1;
}

.text-area { 
    height:460.8px;
    display: block;
    margin-top: 20px;
    margin-bottom: 20px;
    overflow-y: scroll;
}

.friend-text {
    display: flex;
    font-size: 2rem;
}

.friend-text .text {
    margin-left: 10px;
}

.own-text {
    font-size: 2rem;
    text-align: right;
    margin-right: 10px;
}

.message {
    width: 100%;
    display: flex;
    text-align: end;
}

.img {
    border: 1px solid #333333;
    width: 5%;
    text-align: center;
}

.img:hover {
    cursor: pointer;
}

.message {
    font-size: 2rem;
}

input {
    width: 85%;
}

input[type="text"] {
    font-size: 25px;
}

#send {
    width: 12%;
    text-align: center;
    border: 1px solid #333333;
}

#send:hover {
    cursor: pointer;
}

img {
    width: 28px;
    height: 28px;
    border: 1px solid #333333;
    border-radius: 30px;
}
`
class chatArea extends HTMLElement {
    constructor(){
        super();
        this._shadowDom = this.attachShadow({mode:"open"})
    }
    async connectedCallback(){
        const currentConversation = getItemLocalStorage("currentConversation")
        const currentUser = getItemLocalStorage("currentUser")
        const data = await firebase.firestore().collection("conversations").doc(currentConversation).get();
        this.listenCollectionChanged();
        const getData = getDataFromDoc(data);
        this.name = getData.name;
        let html = ``
        getData.messages.forEach(message => {
            if(message.uid === currentUser.id) {
                html+=`<div class="own-text">${message.text}</div>`
            }else{
                html+=`
                <div class="friend-text">
                    <img src="./someImg/clearAvatar.png" alt="">
                    <div class="text">${message.text}</div>
                </div>
                `
            }
        })
        this._shadowDom.innerHTML = `
        <style>
            ${style}
        </style>
        <div class="container">
            <div class="title">
                <div class="name">${this.name}</div>
                <div class="more">
                    <div class="button">...</div>
                    <div class="select">
                        <div class="rename">rename</div>
                        <div class="delete">delete</div>
                    </div>
                </div>
            </div>
            <div class="text-area">
                ${html}
                <div id="scroll"></div>
            </div>
            <div class="message">
                <div class="img">IMG</div>
                <input id ="send-message" type="text" placeholder=".  .  .  .  .  .  .">
                <div id="send">Send</div>
            </div>
        </div>
        `
        this._shadowDom.querySelector("#scroll").scrollIntoView();
        const sendButton = this._shadowDom.getElementById("send")
        sendButton.addEventListener("click", async () => {
            const currentConversation = getItemLocalStorage("currentConversation")
            const messageSend = this._shadowDom.getElementById("send-message").value
            const id = currentConversation;
            this._shadowDom.getElementById("send-message").value =""
            if(messageSend === ""){
                return;
            }
            const newMessage = {
                createdAt: new Date().toISOString(),
                uid: currentUser.id,
                text : messageSend,
                Ava : "",
            }
            updateMessage(newMessage, id);
        })
    }
    async listenCollectionChanged(){
        const currentConversation = getItemLocalStorage("currentConversation")
        const currentUser = getItemLocalStorage("currentUser");
        let firstRun = true
        const res = await firebase.firestore().collection("conversations").doc(currentConversation).onSnapshot((snapShot) => {
            if(firstRun){
                firstRun = false;
                return;
            }
            const messagesLength = getDataFromDoc(snapShot).messages.length -1;
            const newestMessage = getDataFromDoc(snapShot).messages[messagesLength]
            this.appendPostItem(newestMessage)
        })
    }
    appendPostItem(data){
        let currentUser = getItemLocalStorage("currentUser")
        if(data.uid === currentUser.id){
            const ownText = document.createElement("div")
            ownText.setAttribute("class", "own-text")
            ownText.innerHTML=`${data.text}`
            this._shadowDom.querySelector(".text-area").insertBefore(ownText, this._shadowDom.querySelector("#scroll"))
            this._shadowDom.querySelector("#scroll").scrollIntoView();
        }else{
            const friendText = document.createElement("div")
            friendText.setAttribute("class", "friend-text")
            friendText.innerHTML=`
                <img src="./someImg/clearAvatar.png" alt="">
                <div class="text">${data.text}</div>
            `
            this._shadowDom.querySelector(".text-area").insertBefore(friendText, this._shadowDom.querySelector("#scroll"))
            this._shadowDom.querySelector("#scroll").scrollIntoView();
        }
    }
    switchConversation(){

    }
}
window.customElements.define("chat-area", chatArea);