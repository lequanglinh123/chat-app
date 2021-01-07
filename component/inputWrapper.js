const style = `
  .error {
    color: red;
  }
  input {
    border-radius: 5px;
    width: 100%;
    border: 1px solid #dbdbdb;
    padding: 12px;
    box-sizing: border-box;
  }
  .input-wrapper {
    margin-bottom: 10px;
  }
`
class InputWrapper extends HTMLElement{
  constructor() {
    super()
    this._shadowDom = this.attachShadow({mode: 'open'})
  }
  connectedCallback() {
    this.type = this.getAttribute('type')
    this.id = this.getAttribute('id')
    this.placeholder = this.getAttribute('placeholder')
    this.error = this.getAttribute('error') || ''
    this._shadowDom.innerHTML = `
      <style>
        ${style}
      </style>
      <div class="input-wrapper">
        <input id="input-main" type="${this.type}" placeholder="${this.placeholder}">
        <div class="error">${this.error}</div>
      </div>
    `
  }
  static get observedAttributes() {
    return ['error']
  }
  attributeChangedCallback(name, oldValue, newValue ) {
    if(name === 'error') {
      this._shadowDom.querySelector('.error').innerHTML = newValue
    }
  }
  // getter
  get value() {
    const value = this._shadowDom.getElementById('input-main').value
    return value
  }
  setNewValue(value) {
    this._shadowDom.getElementById('input-main').value = value;
  }
}
window.customElements.define('input-wrapper', InputWrapper)