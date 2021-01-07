import {getDataFromDocs, getItemLocalStorage, getDataFromDoc, insertAfter, saveToLocalStorage} from '../utils.js'
const style =`
*{
    margin: 0;
    padding: 0;
}
.container{
    margin-top:20px;
    margin-left:10px;
}
.search{
    margin-bottom:20px;
}
.paging{
    text-align: center;
}
`
class listConversation extends HTMLElement {
    constructor(){
        super();
        this._shadowDom = this.attachShadow({mode:"open"})
    }
    async connectedCallback(){
        const currentUser = getItemLocalStorage("currentUser");
        this.listenCollectionAdded();
        this.addNewTextInConversation();
        const conversationData = await firebase.firestore().collection("conversations").get();
        const listConversation =  getDataFromDocs(conversationData);
        // console.log(listConversation);
        let listIdFriend = [];
        listConversation.forEach(conversation =>{
            conversation.people.forEach(person =>{
                if(person !== currentUser.id)
                    listIdFriend.push(person)
            })
        })
        // console.log(listIdFriend);
        let html = ''
        let i = 0;
        listConversation.forEach((conversation) => {
            const messagesLength = conversation.messages.length;
            if(messagesLength === 0){
                html+=`<each-conversation id="${conversation.id}" name="${listIdFriend[i]}" createby="" lastmessage=""></each-conversation>`                
                i+=1
            }else{
                html+=`<each-conversation id= "${conversation.id}"name="${listIdFriend[i]}" createby="${conversation.messages[messagesLength-1].uid}" lastmessage="${conversation.messages[messagesLength-1].text}"></each-conversation>`
                i+=1
            }
        })
        let html2 =``
        if(listConversation<=9){
            html2=''
        }
        if(listConversation>9){
            html2=`
            <button>1</button>
            <button>2</button>
            `
        }
        this._shadowDom.innerHTML =`
        <style>
            ${style}
        </style>
        <div class="container">
            <div class="search">
                <input id="search-input" type="text" placeholder="Find in your chat...">
                <button id="btn">Search</button>
            </div>
            ${html}
            <div class="paging">
                ${html2}
            </div>
        </div>
        `
        
        this._shadowDom.querySelectorAll("each-conversation").forEach(conversation =>{
            conversation.addEventListener("click", function(){
                saveToLocalStorage("currentConversation", this.getAttribute("id"))
            })
        })
    }
    async listenCollectionAdded(){
        let firstRun = true
        const res = await firebase.firestore().collection("conversations").onSnapshot((snapShot) => {
            if(firstRun){
                firstRun = false;
                return;
            }
            const docChanges = snapShot.docChanges();
            for(const oneChange of docChanges){
                if(oneChange.type ==="added")
                    this.addNewConversation(getDataFromDoc(oneChange.doc));
            }
        })
    }
    addNewConversation(data){
        let name = "";
        const currentUser = getItemLocalStorage("currentUser")
        const newConversation = document.createElement("each-conversation")
        data.people.forEach(person => {
            if(person !== currentUser.id)
            name = person
        })
        newConversation.setAttribute("name", name);
        newConversation.setAttribute("createdBy", "");
        newConversation.setAttribute("lastMessage", "");
        newConversation.setAttribute("style", "font-weight: bold;");
        insertAfter(newConversation, this._shadowDom.querySelector(".search"))
    }
    async addNewTextInConversation(){
        const currentConversation = getItemLocalStorage("currentConversation")
        const currentUser = getItemLocalStorage("currentUser");
        let firstRun = true
        const res = await firebase.firestore().collection("conversations").doc(currentConversation).onSnapshot((snapShot) => {
            if(firstRun){
                firstRun = false;
                return;
            }else{
                const messagesLength = getDataFromDoc(snapShot).messages.length -1;
                const newestMessage = getDataFromDoc(snapShot).messages[messagesLength]
                this.checkNewMessage(newestMessage.text, newestMessage.uid,  currentConversation)
                // console.log(newestMessage.text);
            }
        })
    }
    checkNewMessage(newMessage, createdBy, id) {
        this._shadowDom.getElementById(id).setAttribute("lastmessage", newMessage);
        this._shadowDom.getElementById(id).setAttribute("createdBy", createdBy);
    }
}
window.customElements.define('list-conversation',listConversation);