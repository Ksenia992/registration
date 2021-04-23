import BaseClass from "./base-class"

export class SignIn extends BaseClass {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: "closed" })
    const container = this.addElement("figure")
    const styleSheet = this.addElement("style")
    styleSheet.textContent = this.css
    container.innerHTML = this.template
  }
  connectedCallback() {
    this.saveUsers()
    const [login, password, button] = [
      "#login",
      "#password",
      "#button",
    ].map((name) => this.shadow.querySelector(name))

    login.oninput = function (event) {
      const user = localStorage.get(event.target.value)
      event.target.style.color = user ? "#090" : "#f00"
      password.disabled = !user
    }
    password.oninput = function (event) {
      const { password } = localStorage.get(login.value)
      event.target.style.color =
        password === event.target.value ? "#090" : "#f00"
      button.disabled = password !== event.target.value
    }
    button.onclick = function (event) {
      document.getElementById("authorization").remove()
      const user = localStorage.get(login.value)
      fetch(`http://localhost:3000/users/${user.id}`)
        .then((response) => response.json())
        .then((response) => {
          sessionStorage.set(
            "currentUser",
            Object.assign({}, response, {
              lastVisit: new Date().toLocaleString(),
            })
          )
        })

      document.body.appendChild(document.createElement("p")).id = "success_in"
      success_in.innerHTML = "You have succesfully signed in!"
      success_in.style.color = "#FF69B4"

      setTimeout(function () {
        success_in.style.display = "none"
      }, 3000)
    }
  }
}

SignIn.prototype.css = `
  figure {
    position: absolute;
    width: 502px;
    left: 50%;
    transform: translateX(-50%);
    height: 300px;
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
  #button {
    cursor:pointer;
  }
`

SignIn.prototype.template = `
  <input id="login" placeholder="User Name">
  <input type="password" id="password" placeholder="Password" disabled>
  <button id="button" disabled>Sign In</button>
`

customElements.define("sign-in", SignIn)
