import { Rectangle } from './rectangle.js';
import { Triangle } from './triangle.js';
import { Circle } from './circle.js';
import { Polygon } from './polygon.js';
import { SemiCircle } from './semiCircle.js'
import { Wedge } from './wedge.js'
import { Trapezoid } from './trapezoid.js'

let simples = {
    Rectangle: Rectangle,
    Triangle: Triangle,
    Circle: Circle,
    Polygon: Polygon,
    SemiCircle: SemiCircle,
    Wedge: Wedge,
    Trapezoid: Trapezoid
};

export { simples }