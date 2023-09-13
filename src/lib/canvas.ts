export type Canvas<T> = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  state: T;
  setup: (canvas: HTMLCanvasElement) => T;
  paint: ({
    ctx,
    state,
    canvas,
  }: {
    ctx: CanvasRenderingContext2D;
    state: T;
    canvas: HTMLCanvasElement;
  }) => void;
  clean: () => void;
  resize: (canvas: HTMLCanvasElement) => void;
};

export type CanvasOptions<T> = {
  setup: (canvas: HTMLCanvasElement) => T;
  paint?: ({
    ctx,
    state,
    canvas,
  }: {
    ctx: CanvasRenderingContext2D;
    state: T;
    canvas: HTMLCanvasElement;
  }) => void;
  clean?: () => void;
  resize?: (canvas: HTMLCanvasElement) => void;
};

export function createScene<T>(canvasArray: Canvas<T>[]) {
  let requestId: number | null = null;
  if (!window) {
    throw new Error("Cannot call 'createScene' on the server");
  }

  window.addEventListener("resize", () => {
    for (let i = 0; i < canvasArray.length; i++) {
      canvasArray[i].resize(canvasArray[i].canvas);
    }
  });

  for (let i = 0; i < canvasArray.length; i++) {
    canvasArray[i].state = canvasArray[i].setup(canvasArray[i].canvas);
  }

  const loop = () => {
    for (let i = 0; i < canvasArray.length; i++) {
      canvasArray[i].paint({
        ctx: canvasArray[i].ctx,
        state: canvasArray[i].state,
        canvas: canvasArray[i].canvas,
      });
    }
    requestId = window.requestAnimationFrame(loop);
  };

  requestId = window.requestAnimationFrame(loop);
}

export function createCanvas<T>(
  canvasElement: HTMLCanvasElement,
  canvasOptions: CanvasOptions<T>,
): Canvas<T> {
  const canvas: Canvas<T> = {} as Canvas<T>;

  if (!canvasElement) {
    throw new Error("Canvas element is undefined");
  }

  const ctx = canvasElement.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context is null");
  }

  canvas.ctx = ctx;
  canvas.canvas = canvasElement;
  canvas.setup = canvasOptions.setup;
  canvas.paint = canvasOptions?.paint ?? ((_) => { });
  canvas.clean = canvasOptions?.clean ?? (() => { });
  canvas.resize = canvasOptions?.resize ?? ((_) => { });

  return canvas;
}
