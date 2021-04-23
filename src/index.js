import { SignUp, SignIn } from "./components"

document.getElementById("sign-in").onclick = function (event) {
  document.body.appendChild(document.createElement("sign-in")).id =
    "authorization"
  registration.remove()
}

document.getElementById("sign-up").onclick = function (event) {
  document.body.appendChild(document.createElement("sign-up")).id =
    "registration"
  authorization.remove()
}
