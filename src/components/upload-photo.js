class UploadPhoto extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: "closed" })
    const container = this.shadow.appendChild(document.createElement("figure"))
    const template = `
      <style>
        figure {
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
          border: 1px solid #999;
        }
        img {
          width: 300px;
        }
      </style>
      <input id="input-photo" type="file">
      <img id="photo" src="assets/hello.jpg">
      
    `
    container.innerHTML = template
  }
  connectedCallback() {
    const [inputPhoto, photo] = ["#input-photo", "#photo"].map((item) =>
      this.shadow.querySelector(item)
    )

    inputPhoto.onchange = function (event) {
      const reader = new FileReader()
      reader.onload = function (loadEvent) {
        photo.src = loadEvent.target.result
        fetch("http://localhost:3000/photos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: sessionStorage.get("currentUser").id,
            photo: loadEvent.target.result,
          }),
        })
      }
      reader.readAsDataURL(event.target.files[0])
    }
  }
}
//
customElements.define("upload-photo", UploadPhoto)

export default UploadPhoto
