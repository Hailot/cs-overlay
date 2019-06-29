var fs = require('fs')
  , util = require('util')
  , xmlbuilder = require('xmlbuilder')
  , Layer = require('./layer')
  , Color = require('./color')

function Painter(options) {
  if (!(this instanceof Painter)) {
    return new Painter(options)
  }

  this.root = xmlbuilder.create('svg')
  this.root.attributes = {
    width: options.width + 'px',
    height: options.height + 'px',
    viewBox: '0 0 ' + options.width + ' ' + options.height,
    version: '1.1',
    xmlns: 'http://www.w3.org/2000/svg'
  }

  Layer.call(this)

  if (options.title) {
    this.title(options.title)
  }

  if (options.desc) {
    this.desc(options.desc)
  }
}
util.inherits(Painter, Layer)
Painter.createPainter = Painter

Painter.prototype.title = title
function title(text) {
  this.root.ele('title', {}, text)

  return this
}

Painter.prototype.desc = desc
function desc(text) {
  this.root.ele('desc', {}, text)

  return this
}

Painter.prototype.render = render
function render(stream, options) {
  if (typeof stream !== 'object') {
    stream = fs.createWriteStream(stream)
  }

  stream.write(this.toString(options))
  stream.end()
}

Painter.prototype.toString = toString
function toString(options) {
  return this.root.document().toString(options)
}

Painter.Color = Color
Painter.Layer = Layer
module.exports = Painter
