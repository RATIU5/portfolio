export type Canvas<T> = {
  ctx: CanvasRenderingContext2D;
  state: T;
  setup: () => T;
  paint: ({ ctx, state }: { ctx: CanvasRenderingContext2D; state: T }) => void;
  clean: () => void;
  resize: (canvas: HTMLCanvasElement) => void;
};

export type CanvasOptions<T> = {
  setup: () => T;
  paint?: ({ ctx, state }: { ctx: CanvasRenderingContext2D; state: T }) => void;
  clean?: () => void;
  resize?: (canvas: HTMLCanvasElement) => void;
};

export function createScene<T>(canvasArray: Canvas<T>[]) {
  let requestId: number | null = null;
  if (!window) {
    throw new Error("Cannot call 'createScene' on the server");
  }

  for (let i = 0; i < canvasArray.length; i++) {
    canvasArray[i].setup();
  }

  const loop = () => {
    for (let i = 0; i < canvasArray.length; i++) {
      canvasArray[i].paint({
        ctx: canvasArray[i].ctx,
        state: canvasArray[i].state,
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
  canvas.setup = canvasOptions.setup;
  canvas.paint = canvasOptions?.paint ?? ((_) => { });
  canvas.clean = canvasOptions?.clean ?? (() => { });
  canvas.resize = canvasOptions?.resize ?? ((_) => { });

  return canvas;
}
