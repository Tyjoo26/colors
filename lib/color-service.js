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
    fetch(this.baseUrl, this.postConfig(object))
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
    // i want to iterate of array of words and then pass each word into another loop that iterates over an array of objects. I want to check each passed word against the value of the object. If the word exists as an object value, then push that object into a new array. store that array of objects into a storeArray function that is basically an empty object in order to preserve duplicates for posting to API,
  }
  storeCollectionForPost(presentColors) {
    this.postCollection = [...presentColors]
    this.sanitizeForPost(this.postCollection)
  }
  sanitizeForPost(array) {
    let postArray = []
    array.forEach(element => {
      let postObject = {}
      postObject.value = {color: element}
      postArray.push(postObject)
    })
    this.iterateForPost(postArray)
  }
  iterateForPost(array) {
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
