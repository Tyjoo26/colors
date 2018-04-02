


class ColorService {
  constructor() {
    this.baseUrl = "https://color-swatch-api.herokuapp.com/"
  }
  getTopColor() {
    fetch(`${this.baseUrl}/api/v1/top_color`)
      .then((response) => response.json())
      .then((response) => this.appendTopColor(response))
  }
  appendTopColor(object) {
    let $topColor = $(`.top-color`)
    $topColor.append(this.addTopColor(object))
  }
  addTopColor(object) {
    return `${object.value} / Color Count: ${object.color_count}`
  }
}



module.exports = ColorService
