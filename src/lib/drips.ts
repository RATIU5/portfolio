export function renderDrip(
  ctx: CanvasRenderingContext2D,
  options: {
    x: number;
    y: number;
    width: number;
    height: number;
    invert: boolean;
  },
) {
  ctx.fillStyle = "#24272E";
  let x = options.x; // x-coordinate of the top-left corner
  let y = options.y; // y-coordinate of the top-left corner
  let width = options.width;
  let height = options.height;
  let radius = width / 2; // This ensures the half-circle fits perfectly under the rectangle

  // Draw the combined rectangle and half-circle in a single path
  ctx.beginPath();
  ctx.moveTo(x, y); // Start at the top-left corner
  ctx.lineTo(x + width, y); // Draw the top side of the rectangle
  ctx.arc(x + radius, y + height, radius, 0, Math.PI, options.invert);
  ctx.lineTo(x, y + height); // Close the bottom side of the rectangle
  ctx.closePath();
  ctx.fill();
}

export type DripOptions = {
  width: number;
  height: number;
  x: number;
  y: number;
  invert: boolean;
  angle: number;
};

export function createDrip(options: DripOptions) {
  return {
    width: options.width ?? 100,
    height: options.height ?? 200,
    x: options.x ?? 0,
    y: options.y ?? 0,
    invert: options.invert ?? false,
    angle: options.angle ?? 0,
  };
}

export type DripsOptions = {
  dripWidth: number;
  containerWidth: number;
};

export function createDrips(options: DripsOptions) {
  const array = [];
  for (let i = 0; i < options.containerWidth; i += options.dripWidth) {
    let height = 0;
    if (i % 200 === 0) {
      height = Math.floor(Math.random() * (350 - 275 + 1)) + 275;
    } else {
      height = Math.floor(Math.random() * (200 - 100 + 1)) + 100;
    }
    array.push(
      createDrip({
        width: 100,
        height: height,
        x: i,
        y: 0,
        invert: i % 200 !== 0,
        angle: Math.random() * 2 * Math.PI,
      }),
    );
  }
  return array;
}
