import BaseClass from "./base-class"

export class SignUp extends BaseClass {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: "closed" })
    const container = this.addElement("figure")
    const styleSheet = this.addElement("style")
    styleSheet.textContent = this.css
    container.innerHTML = this.template
    this.users = null
  }
  connectedCallback() {
    this.getUsers()
    const [login, password, avatarImage, avatar, button] = [
      "#login",
      "#password",
      "#avatarImage",
      "#avatar",
      "#button",
    ].map((name) => this.shadow.querySelector(name))

    login.oninput = function (event) {
      const user = localStorage.get(event.target.value)
      event.target.style.color = !user ? "#090" : "#f00"
      password.disabled = !!user
    }

    password.oninput = function (event) {
      event.target.style.color =
        event.target.value.length >= 8 ? "#090" : "#f00"
      button.disabled = event.target.value.length < 8
    }

    button.onclick = function (event) {
      document.getElementById("registration").remove()
      localStorage.set(login.value, {
        name: login.value,
        password: password.value,
      })
      const user = Object.assign({}, localStorage.get(login.value), {
        avatar: avatarImage.src,
      })
      fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })

      document.body.appendChild(document.createElement("p")).id = "success_up"
      success_up.innerHTML = "You have succesfully signed up!"
      success_up.style.color = "#FF69B4"

      setTimeout(function () {
        success_up.style.display = "none"
      }, 3000)
    }

    avatar.onchange = function (event) {
      const reader = new FileReader()
      reader.onload = function (readerEvent) {
        avatarImage.src = readerEvent.target.result
      }
      reader.readAsDataURL(event.target.files[0])
    }
  }
}

SignUp.prototype.css = `
  figure {
    position: absolute;
    width: 502px;
    left: 50%;
    transform: translateX(-50%);
    padding: 32px;
    box-shadow: 8px 8px 16px #0007;
    background: #C71585;
    border: 1px solid #ddd;
    box-sizing: border-box;
  }
  input, button {
    display: block;
    width: 400px;
    padding: 8px 16px;
    margin: 32px auto;
    font-size: 16px;
    font-family: Arial;
    outline:none;
    border:1px solid;
    border-radius:6px;
    color:#C71585;
  }
  img {
    width: 100px;
  }
  #button {
    cursor:pointer;
  }
  input[type=file] {
    outline:0;
    opacity:0;
    pointer-events:none;
    user-select:none;
  }
 .label { 
   width:62px;
   height:32px;
   border:2px solid #FF69B4;
   border-radius:5px;
   display:block;
   padding:1.2em;
   transition:border 300ms ease;
   cursor:pointer;
  }
 .label i {
   display:block;
   font-size:18px;
  }
 .label i, .label .title {
   color:pink;
   transition:200ms color
  }
 .label:hover {
   border:2px solid #EE82EE;
  }
 
`

SignUp.prototype.template = `
  <input id="login" placeholder="User Name">
  <input type="password" id="password" placeholder="Password" disabled>
  <img id="avatarImage" src="assets/kitty.png">
  <label class="label">
      <i class="material-icons">Choose photo</i>
      <input type="file" id="avatar">
    </label>
  <button id="button" disabled>Sign Up</button>
`

customElements.define("sign-up", SignUp)
