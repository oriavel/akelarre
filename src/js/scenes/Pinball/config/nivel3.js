const HALF = 400 - 5;
const FLIPPERS_Y = 520;

const config = {
  level: "PinballLevel3",
  nextLevel: "cueva",
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
  ball: { x: 110, y: 0 },
  flippers: [
    { x: HALF + 110, y: FLIPPERS_Y, direction: "right", key: "SPACE" },
    { x: HALF - 110, y: FLIPPERS_Y, direction: "left", key: "SPACE" },
  ],
  bumpers: [
    { x: 200, y: 190 },
    { x: 600, y: 190 },
    { x: 400, y: 90 },
  ],
  walls: [
    {
      x: HALF - 277,
      y: FLIPPERS_Y - 255,
      slope: -0.45,
      bar: "0 0 0 600 10 600 10 0",
    },
    {
      x: HALF + 285,
      y: FLIPPERS_Y - 255,
      slope: 0.45,
      bar: "0 0 0 600 10 600 10 0",
    },
    { x: HALF, y: -10, slope: 1.571, bar: "0 0 0 830 10 830 10 0" }, // horizontal wall above
  ],
  scoring: { goal: 100, hitPoints: 10 },
};

export default config;
