Storage.prototype.get = function (itemName) {
  return JSON.parse(this.getItem(itemName))
}
Storage.prototype.set = function (itemName, data) {
  this.setItem(itemName, JSON.stringify(data))
}



