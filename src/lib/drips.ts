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
  let x = options.x;
  let y = options.y;
  let width = options.width;
  let height = options.height;
  let radius = width / 2;

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + width, y);
  ctx.arc(x + radius, y + height, radius, 0, Math.PI, options.invert);
  ctx.lineTo(x, y + height);
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
      height = Math.floor(Math.random() * (300 - 215 + 1)) + 215;
    } else {
      height = Math.floor(Math.random() * (150 - 50 + 1)) + 50;
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
