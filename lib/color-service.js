import COLORS from './data/colors'


class ColorService {
  constructor() {
    this.baseUrl = "https://color-swatch-api.herokuapp.com/"
    this.hexCodes = COLORS
  }
  getTopColor() {
    fetch(`${this.baseUrl}/api/v1/top_color`)
      .then((response) => response.json())
      .then((response) => this.appendTopColor(response))
  }
  getAllColors() {
   return fetch(`${this.baseUrl}/api/v1/colors`)
      .then((response) =>  response.json())
      .then((json) => {
        if (!response.ok) {
          const error = {
          status: response.status,
          statusText: response.statusText,
          json
        }
        return Promise.reject(error)
      }
     return Promise.resolve(json)})
  }
  appendTopColor(object) {
    let $topColor = $(`.top-color`)
    $topColor.append(this.addTopColor(object))
  }
  addTopColor(object) {
    return `${object.value} with count: ${object.color_count}`
  }
  sanitizeTextInput(input) {
    let textArray = input.split(" ")
    this.checkTextColors(textArray)
  }
  checkTextColors(array) {
    let colorArray = this.getAllColors()
    console.log(colorArray)
    let presentColors = []
    // console.log(colorArray)
    for (var i = 0; i < array.length; i++) {
      for (var i = 0; i < colorArray.length; i++) {
        if(array[i] === colorArray[i].value) {
          presentColors.push(colorArray[i])
        }
      }
    }
    this.iterateOverCollection(presentColors)
    // i want to iterate of array of words and then pass each word into another loop that iterates over an array of objects. I want to check each passed word against the value of the object. If the word exists as an object value, then push that object into a new array. store that array of objects into a storeArray function that is basically an empty object in order to preserve duplicates for posting to API,
  }
  iterateOverCollection(array) {
    for (var i = 0; i < array.length; i++) {
      this.appendSwatch(array[i])
    }
  }
  appendSwatch(object) {
    $(`article.colorized-text`).append(this.addSwatch(object))
  }
  addSwatch(object) {
    return `<div class="swatch" style="background-color:${this.hexCodes[object.value]}"></div>`
  }
}



module.exports = ColorService