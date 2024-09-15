interface TapDetectorOptions {
  /**
   * The duration in **milliseconds** that the user must press the element for the long press to be detected.
   *
   * @default 500
   */
  duration?: number;
  /**
   * The maximum number of **pixels** that the user can move their finger before the long press is canceled.
   *
   * @default 10
   */
  movementThreshold?: number;
}

export function tapDetector({
  duration = 200,
  movementThreshold = 10,
}: TapDetectorOptions = {}) {
  let startX = 0;
  let startY = 0;
  let startedAt: Date | null = null;

  return {
    tapEventHandler,
  };

  function tapEventHandler(e: TouchEvent) {
    if (e.touches.length > 1) {
      reset();
      return false;
    }
    const touch = e.touches[0];

    if (e.type === "touchstart") {
      startX = touch.clientX;
      startY = touch.clientY;
      startedAt = new Date();
    } else if (e.type === "touchmove") {
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;
      if (
        Math.abs(dx) > movementThreshold ||
        Math.abs(dy) > movementThreshold
      ) {
        reset();
      }
    } else if (e.type === "touchend") {
      if (startedAt && Date.now() - startedAt!.getTime() <= duration) {
        reset();
        return true;
      }
      reset();
      return false;
    }
  }

  function reset() {
    startX = 0;
    startY = 0;
    startedAt = null;
  }
}
