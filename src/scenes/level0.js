import { engine } from "../engine/engine.js";

let shapes = engine.shapesRegistry;
let Width;
let Height;

let skyHeight;
let lakeHeight;
let earthHeight;
let caveHeight;

const BROWN = "#190D03";
const BLUE = "rgb(0,47,57)";
const GREEN = "rgb(0,74,37)";
const DARKPURPLE = "#1A001A";
const LIGHTPURPLE = "#44355B";
const PINK = "pink";
const FONTPRIMARY = "BungeeShade";
const WHITE = "white";
const BLACK = "black";
const GRAY = "gray";
const YELLOW = "yellow";
const OLIVE = "#666633";

function level0() {
  Width = shapes.staticBackgroundCanvas.width;
  Height = shapes.staticBackgroundCanvas.height;

  skyHeight = Height.percent(100);
  //   lakeHeight = Height.percent(20);
  //   earthHeight = Height.percent(10);
  //   caveHeight = Height.percent(30);

  shapes.staticBackgroundCanvas.element.style.backgroundColor = PINK;

  StripedBalloons();
  Mountains();
  Clouds();
  Text();
  //   Wheel();
  // Cave();
  //   Lake();
  //   Crystals();
  //   GleamingCrystals();
  //   WaterFall();
}

function Text() {
  let size = Width.percent(5);
  let x = Width.percent(50);
  let y = Height.percent(8);

  let text = new engine.simples.Text("Gary Kertis", x, y, size, FONTPRIMARY);
  text.color = "black";

  shapes.addToStaticForeground(text);
}

function WaterFall() {
  let x = Width.percent(30);
  let y = skyHeight + lakeHeight + earthHeight;
  let waterFall = new engine.complex.PourComposite(
    x,
    y,
    Width.percent(10),
    Height.percent(35)
  );
  waterFall.color = trees.setOpacity(BLUE, 0.5);
  shapes.addToDynamicBackground(waterFall);
  waterFall.start();
  waterFall.activePour.oscillate = true;
  for (let i = 0; i < waterFall.height; i++) {
    waterFall.activePour.addDrop();
  }

  let dropY = y;
  waterFall.activePour.drops.forEach((drop) => {
    drop.y = dropY;
    dropY += 1;
  });
  waterFall.stop();
  waterFall.start();
  let splash = new engine.complex.Box(
    x - Width.percent(1),
    y + Height.percent(21),
    Width.percent(12),
    Height.percent(2)
  );
  shapes.addToDynamicBackground(splash);
  engine.patterns.polkaDots(
    splash,
    engine.simples.Circle,
    20,
    1,
    Width.percent(4),
    WHITE
  );
  splash.shape.forEach((shape) => {
    if (shape.type === "Circle") {
      shape.x = splash.center.x;
      shape.y = splash.center.y;
      shape.speed =
        trees.posNeg() * trees.random(1, splash.width / Width.percent(4));
    }
  });
  splash.callback = function () {
    splash.shape.forEach((shape, index) => {
      if (shape.type === "Circle") {
        if (
          shape.x + shape.width < splash.x ||
          shape.x > splash.x + splash.width
        ) {
          shape.x = splash.center.x - shape.width / 2;
          shape.y = splash.center.y;
          shape.speed =
            (index % 2 === 0 ? 1 : -1) *
            trees.random(1, splash.width / Width.percent(4));
        } else {
          shape.x += shape.speed;
        }

        if (shape.y > splash.center.y - shape.width / 2) {
          shape.y -= Math.abs(shape.speed);
        }
      }
    });
  };
}

function StripedBalloons(start) {
  for (let i = 0; i < 10; i++) {
    let size = Width.percent(trees.random(1, 5));
    let x = Width.percent(trees.random(0, 95));
    let y = start || Height.percent(trees.random(50, 100));

    let balloon = new engine.client.StripedBalloon(x, y, size, size);
    balloon.stripeWidth = balloon.width.percent(trees.random(1, 20));
    balloon.stripeSpacing = balloon.width.percent(trees.random(1, 20));

    balloon.stripeColor = (function () {
      let arr = [];
      for (let i = 0; i < trees.random(1, 25); i++) {
        arr.push(trees.randomColor());
      }
      return arr;
    })();

    balloon.stripeOrientation = ["vertical", "diagonal", "horizontal"][
      trees.random(0, 2)
    ];
    balloon.color = trees.randomColor();
    balloon.callback = function () {
      this.y -= size / 40;
      shapes.remove(this);
    };
    shapes.addToDynamicBackground(balloon);
  }
}

function Clouds() {
  for (let i = 0; i < 20; i++) {
    let width = Width.percent(trees.random(2, 15));
    let x = trees.random(0, Width);
    let y = trees.random(0, skyHeight - Height.percent(10));
    let height = width / 4;
    let cloud = new engine.client.Cloud(x, y, width, height);
    let opacity = 1 - width / 300;
    cloud.color = trees.setOpacity(WHITE, opacity);
    shapes.addToStaticForeground(cloud);
  }
}

function Mountains() {
  let width = Width;
  let height = Height.percent(25);
  let x = 0;
  let y = skyHeight - height;
  let mountain = new engine.client.Mountains(x, y, width, height);
  mountain.color = BLACK;
  shapes.addToDynamicBackground(mountain);

  engine.patterns.polkaDots(mountain, engine.simples.Circle, 100, 1, 5, YELLOW);
}

function Wheel() {
  let width = Width.percent(32.3);
  let height = width;
  let x = Width.percent(15);
  let y = skyHeight - height / 2;

  let wheel = new engine.client.WaterWheel(x, y, width, height);

  wheel.callback = function () {
    wheel.rotate(0.5, wheel.center);
  };
  shapes.addToDynamicBackground(wheel);
}

function Crystals() {
  for (let i = 0; i < 50; i++) {
    let x = trees.random(0, Width);
    let y = trees.random(
      skyHeight + lakeHeight + earthHeight,
      skyHeight + lakeHeight + earthHeight + caveHeight
    );
    let height = trees.random(Width.percent(0.1), Width.percent(1));
    let width = height;

    let crystal = new engine.client.Crystal(x, y, width, height);
    crystal.color = trees.randomColor();
    crystal.rotate(trees.random(0, 180), crystal.center);
    shapes.addToStaticBackground(crystal);
  }
}

function GleamingCrystals() {
  for (let i = 0; i < 3; i++) {
    let x = trees.random(0, Width);
    let y = trees.random(
      skyHeight + lakeHeight + earthHeight,
      skyHeight + lakeHeight + earthHeight + caveHeight.percent(60)
    );
    let height = trees.random(Width.percent(2), Width.percent(4));
    let width = height / 2;

    let gleamingCrystal = new engine.client.GleamingCrystal(
      x,
      y,
      width,
      height
    );
    gleamingCrystal.color = trees.randomColor();
    gleamingCrystal.stripeWidth = gleamingCrystal.width.percent(10);
    gleamingCrystal.stripeSpacing = gleamingCrystal.width.percent(90);
    gleamingCrystal.stripeColor = [trees.setOpacity(WHITE, 0.5)];
    gleamingCrystal.stripeOrientation = "vertical";
    gleamingCrystal.rotate(trees.random(0, 180), gleamingCrystal.center);
    shapes.addToStaticBackground(gleamingCrystal);
  }
}

function Lake() {
  let water = new engine.complex.Box(0, skyHeight, Width, lakeHeight);
  let lake = new engine.client.Lake(0, skyHeight, Width, lakeHeight);
  let earth = new engine.complex.Box(
    0,
    skyHeight + lakeHeight,
    Width,
    earthHeight
  );
  earth.color = BROWN;
  water.color = BLUE;
  lake.color = GREEN;

  engine.patterns.polkaDots(earth, engine.simples.Circle, 100, 1, 5, PINK);
  new engine.complex.RockyBorder(earth, Width.percent(3), earth.lines()[2]);
  new engine.complex.RockyBorder(lake, Width.percent(2), lake.lines()[2]);

  shapes.addToStaticForeground(earth);
  shapes.addToStaticForeground(water);
  shapes.addToStaticForeground(lake);
}

function Cave() {
  let caveBackground = new engine.complex.Box(
    0,
    skyHeight + lakeHeight + earthHeight,
    Width,
    caveHeight
  );
  let cave = new engine.client.Cave(
    0,
    skyHeight + lakeHeight + earthHeight,
    Width,
    caveHeight
  );
  let cavePool = new engine.complex.Box(
    0,
    skyHeight + lakeHeight + earthHeight + caveHeight - Height.percent(8),
    Width,
    Height.percent(8)
  );

  caveBackground.color = DARKPURPLE;
  cave.color = LIGHTPURPLE;
  cavePool.color = BLUE;

  cave.shape.forEach((shape) => {
    if (shape.type === "Box")
      engine.patterns.polkaTrapezoids(shape, 10, 1, 5, GRAY);
  });

  shapes.addToStaticBackground(caveBackground);
  shapes.addToStaticForeground(cavePool);
  shapes.addToStaticForeground(cave);
}

export { level0 };
