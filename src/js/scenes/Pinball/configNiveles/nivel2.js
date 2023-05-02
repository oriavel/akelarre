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
  ball: { x: 130, y: 0 },
  flippers: [{ x: HALF + 90, y: FLIPPERS_Y, direction: "right", key: "SPACE" }],
  bumpers: [
    { x: 210, y: 150 },
    { x: 590, y: 150 },
    { x: 400, y: 90 },
  ],
  walls: [
    {
      x: HALF - 255,
      y: FLIPPERS_Y - 255,
      slope: -0.45,
      bar: "0 0 0 600 10 600 10 0",
    },
    {
      x: HALF + 255,
      y: FLIPPERS_Y - 255,
      slope: 0.45,
      bar: "0 0 0 600 10 600 10 0",
    },
    { x: HALF, y: -10, slope: 1.571, bar: "0 0 0 830 10 830 10 0" }, // horizontal wall above
  ],
  scoring: { goal: 150, hitPoints: 10, lifes: 5 },
};

export default config;
