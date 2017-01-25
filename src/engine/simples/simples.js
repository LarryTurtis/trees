import { Rectangle } from './rectangle.js';
import { Triangle } from './triangle.js';
import { Circle } from './circle.js';
import { Polygon } from './polygon.js';
import { SemiCircle } from './semiCircle.js'
import { Wedge } from './wedge.js'
import { Trapezoid } from './trapezoid.js'
import { Text } from './text.js'

let simples = {
    Rectangle: Rectangle,
    Circle: Circle,
    Wedge: Wedge,
    Trapezoid: Trapezoid,
    Text: Text
};

export { simples }