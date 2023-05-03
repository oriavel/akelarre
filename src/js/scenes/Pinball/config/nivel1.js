const HALF = 400 - 5;
const FLIPPERS_Y = 520;

const config = {
  level: "PinballLevel1",
  nextLevel: "PinballLevel2",
  keyHint: "Presiona las flechas para \n mover los flippers",
  gravity: 1,
  assets: [
    {
      label: "background",
      url: "./src/assets/Backgrounds/cave.jpg",
    },
    {
      label: "ball",
      url: "./src/assets/Pinball/ball.png",
    },
    {
      label: "bumper",
      url: "./src/assets/Pinball/rock.png",
    },
  ],
  ball: { x: 130, y: 0 },
  flippers: [
    { x: HALF + 90, y: FLIPPERS_Y, direction: "right", key: "RIGHT" },
    { x: HALF - 90, y: FLIPPERS_Y, direction: "left", key: "LEFT" },
  ],
  bumpers: [
    { x: 200, y: 190 },
    { x: 400, y: 190 },
    { x: 600, y: 190 },
    { x: 250, y: 140 },
    { x: 550, y: 140 },
    { x: 400, y: 120 },
  ],
  walls: [
    {
      x: HALF - 257,
      y: FLIPPERS_Y - 255,
      slope: -0.45,
      bar: "0 0 0 600 10 600 10 0",
    },
    {
      x: HALF + 265,
      y: FLIPPERS_Y - 255,
      slope: 0.45,
      bar: "0 0 0 600 10 600 10 0",
    },
    { x: HALF, y: -10, slope: 1.571, bar: "0 0 0 830 10 830 10 0" }, // horizontal wall above
  ],
  scoring: { goal: 100, hitPoints: 10, lifes: 3 },
};

export default config;
