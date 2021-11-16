import { StripedBalloon } from "../engine/client/stripedBalloon.js";
import { Balloon } from "../engine/complex/balloon.js";
import { engine } from "../engine/engine.js";

let shapes = engine.shapesRegistry;
let Width;
let Height;

let skyHeight;
let lakeHeight;
let earthHeight;
let caveHeight;

const BROWN = "#190D03";
const BLUE = "lightblue";
const GREEN = "springgreen";
const DARKPURPLE = "#1A001A";
const LIGHTPURPLE = "#44355B";
const PINK = "pink";
const WHITE = "white";
const BLACK = "#333333";
const GRAY = "gray";
const YELLOW = "gold";
const OLIVE = "#666633";

const backgroundColors = [GREEN, BLUE, YELLOW, PINK];

function level0() {
  Width = shapes.staticBackgroundCanvas.width;
  Height = shapes.staticBackgroundCanvas.height;

  skyHeight = Height.percent(100);
  //   lakeHeight = Height.percent(20);
  //   earthHeight = Height.percent(10);
  //   caveHeight = Height.percent(30);

  shapes.staticBackgroundCanvas.element.style.backgroundColor =
    backgroundColors[trees.random(0, backgroundColors.length - 1)];

  StripedBalloons();
  Mountains();
  Clouds();

  let counter = 0;

  document.body.addEventListener("click", (e) => {
    if (counter < 10) StripedBalloons(e.clientX, e.clientY);
    counter++;
  });

  //   Wheel();
  // Cave();
  //   Lake();
  //   Crystals();
  //   GleamingCrystals();
  //   WaterFall();
}

function StripedBalloons(x, y) {
  let numballoons = 1;
  for (let i = 0; i < numballoons; i++) {
    newBalloon(x, y);
  }
}

function newBalloon(x, y) {
  let size = trees.random(30, 100);
  y = y ? y - size / 2 : Height.percent(trees.random(15, 65));
  x = x ? x - size / 2 : -size;

  let balloon = new engine.client.FancyBalloon(x, y, size, size);
  balloon.color = trees.randomColor();
  let drift = size / 150;
  balloon.callback = function () {
    this.x += drift;
    // if ((Date.now() + this.id) % 2 === 0) {
    //   this.x += Math.random() < 0.5 ? -0.1 : 0.1;
    // }
    // this.y += drift;
    this.y = y + (size / 2) * Math.sin(this.x / (2 * size));
    if (this.x > Width.percent(100) + size) {
      shapes.removeFromDynamicBackground(this);
      newBalloon();
    }
  };
  shapes.addToDynamicBackground(balloon);
}

function Clouds() {
  for (let i = 0; i < 10; i++) {
    let width = Width.percent(trees.random(10, 25));
    let x = Width.percent(i * 10);
    let y = trees.random(Height.percent(30), Height.percent(80));
    let height = width / 4;
    let cloud = new engine.client.Cloud(x, y, width, height);
    let opacity = 1 - width / 400;
    cloud.color = trees.setOpacity("beige", opacity);
    shapes.addToStaticForeground(cloud);
  }
}

function Mountains() {
  let width = Width.percent(120);
  let height = Height.percent(25);
  let x = Width.percent(-10);
  let y = skyHeight - height;
  let mountain = new engine.client.Mountains(x, y, width, height);
  shapes.addToStaticBackground(mountain);

  //   engine.patterns.polkaDots(mountain, engine.simples.Circle, 100, 1, 5, YELLOW);
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
