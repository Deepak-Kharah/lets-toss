import classNames from "classnames";
import { For, onCleanup, onMount, Show } from "solid-js";
import {
  fingers,
  hasTossed,
  setFingers,
  sethasTossed,
  setWinnerFinger,
  winnerFinger,
} from "../App";
import { tapDetector } from "../common/tap-detector.util";
import { TOSS_DURATION_IN_MS } from "../common/tosser.constant";
import FingerPointer from "../finger-pointer/FingerPointer";
import "./TouchArea.css";
import { canVibrate } from "../Navbar/Navbar";

const { tapEventHandler } = tapDetector();

function TouchArea() {
  let fingerHoldDurationRef: number | null = null;
  let touchArea!: HTMLDivElement;

  function endToss() {
    if (fingers().length === 0) {
      throw new Error("IMPOSSIBLE CONDITION: No touches to toss!");
    }
    const finger = pickAFinger();
    if (canVibrate()) window.navigator.vibrate([100]);

    setWinnerFinger(finger);
    setFingers([]);
    sethasTossed(true);
  }

  onMount(() => {
    function handleTouch(event: TouchEvent) {
      event.preventDefault();

      if (hasTossed()) {
        const hasTapped = tapEventHandler(event);
        if (hasTapped) {
          sethasTossed(false);
          setWinnerFinger();
        }
        return;
      }

      const newTouches = Array.from(event.touches).map((touch) => ({
        id: touch.identifier,
        x: touch.clientX,
        y: touch.clientY,
      }));

      if (event.type !== "touchmove") {
        if (fingerHoldDurationRef) {
          clearTimeout(fingerHoldDurationRef);
        }

        if (newTouches.length > 1) {
          console.log("enough finger");
          fingerHoldDurationRef = setTimeout(endToss, TOSS_DURATION_IN_MS);
        }

        if (event.type === "touchstart") {
          if (canVibrate()) window.navigator.vibrate(30);
        } else if (event.type === "touchend") {
          if (canVibrate()) window.navigator.vibrate([70, 30, 30]);
        }
      }

      setFingers(newTouches);
    }

    touchArea.addEventListener("touchstart", handleTouch);
    touchArea.addEventListener("touchmove", handleTouch);
    touchArea.addEventListener("touchend", handleTouch);

    onCleanup(() => {
      touchArea.removeEventListener("touchstart", handleTouch);
      touchArea.removeEventListener("touchmove", handleTouch);
      touchArea.removeEventListener("touchend", handleTouch);
    });
  });

  function pickAFinger() {
    const randomIndex = Math.floor(Math.random() * fingers().length);
    const finger = fingers()[randomIndex];
    console.log(randomIndex, fingers(), finger);
    return finger;
  }

  return (
    <section
      ref={touchArea}
      class={classNames("touch-area", {
        tossed: hasTossed(),
        "only-one-finger": fingers().length === 1,
        "enough-fingers": fingers().length > 1,
      })}
      id="touch-area"
    >
      <Show when={fingers().length === 0 && !hasTossed()}>
        <p>Place fingers on the screen to toss</p>
      </Show>
      <Show when={fingers().length === 1}>
        <p class="on-screen-instruction">One more finger to go</p>
      </Show>
      <Show when={fingers().length > 1}>
        <p class="on-screen-instruction">Tossing, hang tight</p>
      </Show>
      <Show when={winnerFinger()}>
        <p class="on-screen-instruction">We have a winner!</p>
        <small class="on-screen-instruction">Tap to continue</small>
      </Show>

      <Show when={!hasTossed()}>
        <ul>
          <For each={fingers()}>
            {(touch) => <FingerPointer x={touch.x} y={touch.y} />}
          </For>
        </ul>
      </Show>

      <Show when={winnerFinger()}>
        <FingerPointer x={winnerFinger()?.x} y={winnerFinger()?.y} />
      </Show>
    </section>
  );
}

export default TouchArea;
