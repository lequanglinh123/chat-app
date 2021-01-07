const style = `
    *{
        margin:0;
        padding:0;
    }
    .lr-header{
        height:50px
    }
    .register-container{
        margin-top: 30px;
    }
    #redirect:hover[
        cursor: pointer:
    ]
`
class RegisterScreen extends HTMLElement {
    constructor(){
        super();
        this._shadowDom = this.attachShadow({mode:"open"})
    }
    connectedCallback() {
        this._shadowDom.innerHTML =`
        <style>
            ${style}
        </style>
        <div class="lr-header">
            <lr-header></lr-header>
        </div>
        <div class="register-container">
            <form id="register-form">
                <h1>Create A New Account</h1>
                <input-wrapper id="first-name" type="text" placeholder="First name"></input-wrapper>
                <input-wrapper id="last-name" type="text" placeholder="Last name"></input-wrapper>
                <input-wrapper id="email" type="text" placeholder="Email"></input-wrapper>
                <input-wrapper id="password" type="password" placeholder="Password"></input-wrapper>
                <input-wrapper id="confirm-password" type="password" placeholder="Confirm password"></input-wrapper>
                <button>Register</button>
                <a id="redirect">Already have an account ?</a>
            </form>
        </div>
        `
        const registerForm = this._shadowDom.getElementById('register-form')
    registerForm.addEventListener('submit', async(e) => {
      e.preventDefault()
      const firstName = this._shadowDom.getElementById('first-name').value
      const lastName = this._shadowDom.getElementById('last-name').value
      const email = this._shadowDom.getElementById('email').value
      const password = this._shadowDom.getElementById('password').value
      const confirmPassword = this._shadowDom.getElementById('confirm-password').value
      let isValid = true
      if (firstName.trim() === '') {
        isValid = false
        this.setError('first-name', 'Please input first name')
      }else{
          this.setError('first-name',"")
      }
      if (lastName.trim() === '') {
        isValid = false
        this.setError('last-name', 'Please input last name')
      }else{
          this.setError('last-name', "")
      }
      if (email.trim() === '') {
        isValid = false
        this.setError('email', 'Please input email')
      }else{
          this.setError('email',"")
      }
      if (password.trim() === '') {
        isValid = false
        this.setError('password', 'Please input password')
      }else{
          this.setError('password', "")
      }
      if (confirmPassword.trim() === '') {
        isValid = false
        this.setError('confirm-password', 'Please input confirm password')
      }else{
          this.setError('confirm-password',"")
      }
      if (password !== confirmPassword) {
        isValid = false
        this.setError('confirm-password', "Password didn't match")
      }else{
          this.setError('confirm-password',"")
      }
      if (!isValid) {
        return
      }
      const user = {
        fullName: firstName + ' ' + lastName,
        email: email,
        password: CryptoJS.MD5(password).toString()
      }
      const check = await this.checkEmailExist(email)
      if (check){
        alert("Email already exists")
        this._shadowDom.getElementById('email').setNewValue("") 
        this._shadowDom.getElementById('password').setNewValue("") 
        this._shadowDom.getElementById('confirm-password').setNewValue("")
      }else{
        firebase.firestore().collection('users').add(user)
        alert('Success')
      }
    }
    )}
    setError(id, message) {
        this._shadowDom.getElementById(id).setAttribute('error', message)
    }
    async checkEmailExist(email) {
        const res = await firebase.firestore().collection('users')
        .where('email', '==' , email).get()
        return !res.empty
    }
}
window.customElements.define("register-screen", RegisterScreen)