var keywords = require('../data/colorKeywords')

function Color(r, g, b) {
  this.r = r
  this.g = g
  this.b = b
}

Color.prototype.toString = toString
function toString() {
  return Color.create(this.r, this.g, this.b)
}

Color.create = create
function create(r, g, b) {
  return 'rgb(' + r + ', ' + g + ', ' + b + ')'
}

Object.keys(keywords).forEach(function (key) {
  Color[key] = keywords[key]
})

module.exports = Color
