var Painter = require('../')
  , map

map = Painter.createPainter({
  width: 400,
  height: 400
})

map.polygon({
  stroke: {
    color: 'black',
    width: 5
  },
  fill: 'none',
  points: [
    { x: 200, y: 100 },
    { x: 300, y: 100 },
    { x: 300, y: 200 },
    { x: 100, y: 200 },
    { x: 100, y: 300 },
    { x: 200, y: 300 }
  ]
})

map.render('./map.svg')
