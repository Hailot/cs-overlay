function Layer(parentNode, options) {
  if (!(this instanceof Layer)) {
    return new Layer(parentNode, options)
  }

  this.root = this.root || parentNode.ele('g', Layer.getStyle(options))
}

Layer.getStyle = getStyle
function getStyle(options) {
  var attrs = {}

  if (options && options.stroke) {
    attrs.stroke = options.stroke.color
    attrs['stroke-width'] = options.stroke.width
    attrs['stroke-linecap'] = options.stroke.linecap
  }

  if (options && options.fill) {
    attrs.fill = options.fill
  }

  return attrs
}

Layer.getPoints = getPoints
function getPoints(points) {
  return points.map(function (point) {
    return point.x + ',' + point.y
  }).join(' ')
}

Layer.validatePoints = validatePoints
function validatePoints(points) {
  if (!points || points.some(function (point) {
    return !(point && point.x && point.y)
  })) {
    throw new Error('Invalid Points')
  }
}

Layer.prototype.createLayer = createLayer
function createLayer(options) {
  return new Layer(this.root, options)
}

Layer.prototype.rect = rect
function rect(options) {
  var attrs

  options = options || {}

  attrs = Layer.getStyle(options)
  attrs.x = options.x || 0
  attrs.y = options.y || 0
  attrs.width = options.width || 0
  attrs.height = options.height || 0

  this.root.ele('rect', attrs)

  return this
}

Layer.prototype.circle = circle
function circle(options) {
  var attrs

  options = options || {}

  attrs = Layer.getStyle(options)
  attrs.cx = options.x || 0
  attrs.cy = options.y || 0
  attrs.r = options.radius || 0

  this.root.ele('circle', attrs)

  return this
}

Layer.prototype.ellipse = ellipse
function ellipse(options) {
  var attrs

  // TODO: Alternatively an ellipse based on width and height.

  options = options || {}
  options.radius = options.radius || {}

  attrs = Layer.getStyle(options)
  attrs.cx = options.x || 0
  attrs.cy = options.y || 0
  attrs.rx = options.radius.x || 0
  attrs.ry = options.radius.y || 0

  this.root.ele('ellipse', attrs)

  return this
}

Layer.prototype.line = line
function line(options) {
  var points = options && options.points
    , attrs

  Layer.validatePoints(points)

  attrs = Layer.getStyle(options)
  attrs.x1 = points[0].x || 0
  attrs.y1 = points[0].y || 0
  attrs.x2 = points[1].x || 0
  attrs.y2 = points[1].y || 0

  this.root.ele('line', attrs)

  return this
}

Layer.prototype.polyline = polyline
function polyline(options) {
  var points = options && options.points
    , attrs

  Layer.validatePoints(points)

  attrs = Layer.getStyle(options)
  attrs.points = Layer.getPoints(points)

  this.root.ele('polyline', attrs)

  return this
}

Layer.prototype.polygon = polygon
function polygon(options) {
  var points = options && options.points
    , attrs

  Layer.validatePoints(points)

  attrs = Layer.getStyle(options)
  attrs.points = Layer.getPoints(points)

  this.root.ele('polygon', attrs)

  return this
}

module.exports = Layer
