import {getDataFromDocs, saveToLocalStorage} from '../utils.js'
const style = `
    *{
        margin:0;
        padding:0;
    }
    .lr-header{
        height: 50px;
    }
    .login-container{
        margin-top :20px;
    }
    #redirect:hover{
        cursor: pointer;
    }
`
class loginScreen extends HTMLElement {
    constructor(){
        super();
        this._shadowDom = this.attachShadow({mode: "open"})
    }
    connectedCallback(){
        this._shadowDom.innerHTML =`
        <style>
            ${style}
        </style>
        <div class="lr-header">
            <lr-header></lr-header>
        </div>
        <div class="login-container">
            <form id="login-form">
                <h1>Login to Chat App</h1>
                <input-wrapper id="email" type="text" placeholder="Email"></input-wrapper>
                <input-wrapper id="password" type="password" placeholder="Password"></input-wrapper>
                <button>Login</button>
                <a id="redirect">Don't have an account ?</a>
            </form>
        </div>   
        `
        const loginFrom = this._shadowDom.getElementById('login-form')
        loginFrom.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = this._shadowDom.getElementById('email').value
            const password = this._shadowDom.getElementById('password').value
            let isValid = true;
            if (email.trim() === ""){
                isValid = false;
                this.setError('email', 'Please input email')
            }else{
                this.setError('email',"")
            }
            if (password.trim() === ""){
                isValid = false;
                this.setError('password', 'Please input password')
            }else{
                this.setError('password',"")
            }
            if(!isValid){
                return
            }
            const user = await firebase.firestore()
            .collection('users')
            .where('email', '==', email)
            .where('password', '==', CryptoJS.MD5(password).toString())
            .get()
            if(user.empty) {
                alert('Email or Password is wrong!!!')
            }else{
                saveToLocalStorage('currentUser', getDataFromDocs(user)[0])
            }
        })
    }
    setError(id, message) {
        this._shadowDom.getElementById(id).setAttribute('error', message)
    }

}
window.customElements.define("login-screen", loginScreen);