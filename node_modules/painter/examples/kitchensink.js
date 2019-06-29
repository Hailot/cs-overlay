var Painter = require('../')
  , kitchensink
  , layer

kitchensink = Painter.createPainter({
  width: 400,
  height: 400
})

layer = kitchensink.createLayer({
  stroke: {
    color: Painter.Color.FUCHSIA,
    width: 5
  },
  fill: 'none'
})

layer.line({
  points: [
    { x: 50, y: 50 },
    { x: 75, y: 350 }
  ]
})

layer.circle({
  x: 150,
  y: 50,
  radius: 25
})

layer.ellipse({
  x: 150,
  y: 150,
  radius: {
    x: 50,
    y: 25
  }
})

layer.rect({
  x: 150,
  y: 200,
  width: 100,
  height: 100
})

layer.polyline({
  points: [
    { x: 300, y: 50 },
    { x: 300, y: 100 },
    { x: 350, y: 100 },
    { x: 350, y: 50 }
  ]
})

layer.polygon({
  points: [
    { x: 275, y: 150 },
    { x: 300, y: 200 },
    { x: 350, y: 200 },
    { x: 325, y: 150 }
  ]
})

kitchensink.render('./kitchensink.svg')
