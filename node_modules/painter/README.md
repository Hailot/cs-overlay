# Painter

I could not for the life of me find a solid module for generating simple images from Node. Enter Painter. It uses SVG to hold the current representation, then renders that representation out to other formats on request.

## Installation

    npm install painter

## Usage Example

    ```
    var Painter = require('painter')
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
    ```

## Support

### Shapes

### Output Formats

 * SVG (Surprised?)

Other formats pending. Patches welcome.

## TODO

 * Make some better documentation. Until then, don't be afraid to look at the source code. Promise it won't byte.
 * Have ideas? Send me an email (or a patch!)
