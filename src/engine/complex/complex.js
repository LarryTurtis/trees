import { SemiCircle } from './circularShapes/semiCircle.js';
import { Circle } from './circularShapes/circle.js';
import { Macaroni } from './thickShapes/macaroni.js';
import { Arch } from './thickShapes/arch.js';
import { Donut } from './thickShapes/donut.js';

import { Hose } from './hose.js';
import { Box } from './box.js';
import { Balloon } from './balloon.js';
import { YinYang } from './yinYang.js';
import { YangYin } from './yangYin.js';


import { PourComposite } from './containers/pourComposite.js';
import { Container } from './containers/container.js';

import { Border } from './borders/border.js';
import { RockyBorder } from './borders/rockyBorder.js';
import { ScallopedBorder } from './borders/scallopedBorder.js';


let complex = {
    SemiCircle: SemiCircle,
    Circle: Circle,
    Macaroni: Macaroni,
    Arch: Arch,
    Donut: Donut,
    Hose: Hose,
    Box: Box,
    Balloon: Balloon,
    YinYang: YinYang,
    YangYin: YangYin,
    Container: Container,
    PourComposite: PourComposite,
    Border: Border,
    RockyBorder: RockyBorder,
    ScallopedBorder: ScallopedBorder
};

export { complex }