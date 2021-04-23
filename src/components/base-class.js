class BaseClass extends HTMLElement {
  constructor() {
    super()
  }
  addElement(tagName) {
    return this.shadow.appendChild(document.createElement(tagName))
  }
  getCurrentUserProp(propName, defaultValue) {
    return sessionStorage.get("currentUser").propName || defaultValue
  }
  async getUsers() {
    this.users = await (await fetch("http://localhost:3000/users")).json()
  }
  async saveUsers() {
    const users = await (await fetch("http://localhost:3000/users")).json()
    users.forEach((user) =>
      localStorage.set(user.name, { id: user.id, password: user.password })
    )
  }
}

customElements.define("base-class", BaseClass)

export default BaseClass
