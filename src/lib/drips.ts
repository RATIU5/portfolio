export function renderDrip(
  ctx: CanvasRenderingContext2D,
  options: {
    x: number;
    y: number;
    width: number;
    height: number;
    invert: boolean;
    reverse: boolean;
  },
) {
  ctx.fillStyle = "#24272E";
  let x = options.x;
  let y = options.y;
  let width = options.width;
  let height = options.height;
  let radius = width / 2;

  ctx.beginPath();
  if (options?.reverse) {
    ctx.moveTo(x, y + height); // Start from bottom left
    ctx.arc(
      x + radius,
      y + radius,
      radius,
      Math.PI,
      2 * Math.PI,
      options.invert,
    ); // Draw the arc

    ctx.lineTo(x + width, y + height); // If not inverted, finish the line to bottom right
    ctx.lineTo(x, y + height);
  } else {
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.arc(x + radius, y + height, radius, 0, Math.PI, options.invert);
    ctx.lineTo(x, y + height);
  }
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
  reverse: boolean;
};

export function createDrips(options: DripsOptions) {
  const array = [];
  for (let i = 0; i < options.containerWidth; i += options.dripWidth) {
    let val = 0;
    if (options.reverse) {
      if (i % 200 === 0) {
        val = Math.floor(Math.random() * (300 - 215 + 1)) + 215;
      } else {
        val = Math.floor(Math.random() * (150 - 50 + 1)) + 50;
      }
    } else {
      if (i % 200 === 0) {
        val = Math.floor(Math.random() * (300 - 215 + 1)) + 215;
      } else {
        val = Math.floor(Math.random() * (150 - 50 + 1)) + 50;
      }
    }

    array.push(
      createDrip({
        width: 100,
        height: options.reverse ? 200 : val,
        x: i,
        y: options.reverse ? val : 0,
        invert: i % 200 !== 0,
        angle: Math.random() * 2 * Math.PI,
      }),
    );
  }
  return array;
}
