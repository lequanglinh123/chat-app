const style =`
* {
    margin: 0;
    padding: 0;
}

.member {
    margin: 20px 30%;
    margin-bottom: 20px;
    display: flex;
    border: 1px solid #333333;
}

.name {
    width: 80%;
    font-size: 20px;
}

.add {
    text-align: center;
    width:30px;
    height:30px;
    margin-left:50px;
    font-size: 20px;
    border: 1px solid #333333;
    border-radius: 30px;
    padding-top:5px;
}
.add:hover{
    cursor: pointer;
}`
class addFiend extends HTMLElement {
    constructor(){
        super();
        this._shadowDom = this.attachShadow({mode:"open"})
    }
    async connectedCallback(){
        
        this.name = this.getAttribute("name")
        this.id = this.getAttribute("id")
        this._shadowDom.innerHTML =`
            <style>
                ${style}
            </style>
            <div class="member"id = "${this.id}">
                <div class="name">${this.name}</div>
                <div class="add">+</div>
            </div>
     
        `
        this._shadowDom.querySelector('.add').addEventListener("click", () => {
            this._shadowDom.querySelector('.add').setAttribute("style", "background: #333333; color: white;")
        })
    }
}
window.customElements.define("add-friend", addFiend);