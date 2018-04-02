import './stylesheets/styles.scss'
import COLORS from './data/colors'

const ColorService = require("./color-service")


const colorService = new ColorService


colorService.getTopColor()



$(`.text-submission button`).on('click', (e) => {
  e.preventDefault();
  let input = $(`textarea`).val()
  colorService.sanitizeTextInput(input)
})
