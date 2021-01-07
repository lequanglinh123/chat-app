import { getDataFromDocs, getItemLocalStorage } from "../utils.js";

const style=``
class listAddFriend extends HTMLElement {
    constructor(){
        super()
        this._shadowDom = this.attachShadow({mode: "open"})
    }
    async connectedCallback(){
        let html = ''
        const res = await firebase.firestore().collection("users").get();
        console.log(res)
        let listUser = getDataFromDocs(res);
        listUser.forEach(user =>{
            html +=`<add-friend name="${user.id}"></add-friend>`
        })
        this._shadowDom.innerHTML=`
            ${html}       
        `
        const currentUser = getItemLocalStorage("currentUser")
        this._shadowDom.querySelectorAll("add-friend").forEach(tag =>{
            tag.addEventListener("click",()=>{
                let data = {
                    name: `${tag.getAttribute("name")} and ${currentUser.id}`,
                    people: [tag.getAttribute("name"), currentUser.id],
                    messages: []
                }
                firebase.firestore().collection("conversations").add(data)
            })
        })
    }
}
window.customElements.define("list-friend", listAddFriend)