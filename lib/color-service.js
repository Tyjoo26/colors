import COLORS from './data/colors'
const [handleResponse, errorLog] = require('./response-handlers')

class ColorService {
  constructor() {
    this.baseUrl = "https://color-swatch-api.herokuapp.com/"
    this.hexCodes = COLORS
    this.postCollection = []
  }
  getTopColor() {
    fetch(`${this.baseUrl}/api/v1/top_color`)
      .then((response) => response.json())
      .then((response) => this.appendTopColor(response))
  }
  postColors(object) {
    fetch(`${this.baseUrl}/api/v1/colors`, this.postConfig(object))
      .then(handleResponse)
      .catch(errorLog)
  }
  postConfig(object) {
    return {
      method: 'POST',
      headers: {'Content-Type': "application/json"},
      body: JSON.stringify(object)
    }
  }
  appendTopColor(object) {
    let $topColor = $(`.top-color`)
    $topColor.append(this.addTopColor(object))
  }
  addTopColor(object) {
    return `${object.value} with count: ${object.color_count}`
  }
  sanitizeTextInput(input) {
    var sanitized = input.replace(/[,.]/g, '')
    let textArray = sanitized.split(" ")

    this.checkTextColors(textArray)
  }
  checkTextColors(array) {
    let color_array = []
    for (var i = 0; i < array.length; i++) {
      if(this.hexCodes[array[i]] !== undefined) {
        color_array.push(array[i])
      }
    }
    this.storeCollectionForPost(color_array)
    this.removeDuplicates(color_array)
  }
  storeCollectionForPost(presentColors) {
    this.postCollection = [...presentColors]
    this.sanitizeForPost(this.postCollection)
  }
  sanitizeForPost(array) {
    let postArray = []
    array.forEach(element => {
      let postObject = {}
      postObject.color = {value: element}
      postArray.push(postObject)
    })
    this.iterateForPost(postArray)
  }
  iterateForPost(array) {
    console.log(array)
    array.forEach(object =>
      this.postColors(object))
  }
  removeDuplicates(array) {
    let unique = []
    for (var i = 0; i < array.length; i++) {
      if(unique.indexOf(array[i]) == -1) {
        unique.push(array[i])
      }
    }
    this.iterateOverCollection(unique)
  }
  iterateOverCollection(array) {
    for (var i = 0; i < array.length; i++) {
      this.appendSwatch(array[i])
    }
  }
  appendSwatch(color) {
    $(`article.colorized-text`).append(this.addSwatch(color))
  }
  addSwatch(color) {
    return `<div class="swatch" style="background-color:${this.hexCodes[color]}"></div>`
  }
}



module.exports = ColorService
