const HALF = 400;
const FLIPPERS_Y = 520;
const config = {
  level: "Pinball",
  gravity: 0.9,
  assets: [
    {
      label: "background",
      url: "./src/assets/Backgrounds/stary-night.webp",
    },
    {
      label: "ball",
      url: "./src/assets/Pinball/ball.png",
    },
  ],
  ball: { x: 130, y: 0 },
  flippers: [
    { x: HALF - 80, y: FLIPPERS_Y, direction: "right", key: "RIGHT" },
    { x: HALF + 80, y: FLIPPERS_Y, direction: "left", key: "LEFT" },
  ],
  bumpers: [
    { x: 200, y: 180 },
    { x: 400, y: 180 },
    { x: 600, y: 180 },
    { x: 250, y: 130 },
    { x: 550, y: 130 },
    { x: 400, y: 110 },
  ],
  walls: [
    { x: HALF - 245, y: FLIPPERS_Y - 235, slope: -0.4 },
    { x: HALF + 245, y: FLIPPERS_Y - 235, slope: 0.4 },
  ],
  scoring: { goal: 1000, hitPoints: 10, lifes: 3 },
};
export default config;
