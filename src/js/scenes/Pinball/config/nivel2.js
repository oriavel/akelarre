const HALF = 400 - 5;
const FLIPPERS_Y = 520;

const config = {
  level: "PinballLevel2",
  nextLevel: "cueva",
  gravity: 1.1,
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
      label: "rock",
      url: "./src/assets/Pinball/rock2.png",
    },
  ],
  ball: { x: 260, y: 0 },
  flippers: [{ x: HALF - 170, y: FLIPPERS_Y, direction: "left", key: "SPACE" }],
  bumpers: [
    { x: 180, y: 120 },
    { x: 310, y: 270 },
    { x: 580, y: 180 },
    { x: 400, y: 110 },
  ],
  walls: [
    {
      x: HALF - 265,
      y: FLIPPERS_Y - 255,
      slope: -0.15,
      bar: "0 0 0 600 10 600 10 0",
    },
    {
      x: HALF + 190,
      y: FLIPPERS_Y - 240,
      slope: 0.65,
      bar: "0 0 0 800 10 800 10 0",
    },
    { x: HALF, y: -10, slope: 1.571, bar: "0 0 0 830 10 830 10 0" }, // horizontal wall above
  ],
  scoring: { goal: 100, hitPoints: 10, lifes: 7 },
};

export default config;
