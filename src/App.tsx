import { createSignal, For, onCleanup, onMount } from "solid-js";
import "./App.css";
import FingerPointer from "./finger-pointer/FingerPointer";

function App() {
  const [touches, setTouches] = createSignal<
    {
      id: number;
      x: number;
      y: number;
    }[]
  >([]);

  onMount(() => {
    // Or use the entire document

    function handleTouch(event: TouchEvent) {
      event.preventDefault();

      const newTouches = Array.from(event.touches).map((touch) => ({
        id: touch.identifier,
        x: touch.clientX,
        y: touch.clientY,
      }));

      // vibrate only when new touches are added
      if (newTouches.length > touches().length) {
        window.navigator.vibrate(30);
      } else if (newTouches.length < touches().length) {
        window.navigator.vibrate([70, 30, 20]);
      }

      console.log(newTouches);

      setTouches(newTouches);
    }

    document.body.addEventListener("touchstart", handleTouch);
    document.body.addEventListener("touchmove", handleTouch);
    document.body.addEventListener("touchend", handleTouch);

    // Cleanup on component unmount (optional, but good practice)
    onCleanup(() => {
      document.body.removeEventListener("touchstart", handleTouch);
      document.body.removeEventListener("touchmove", handleTouch);
      document.body.removeEventListener("touchend", handleTouch);
    });
  });

  return (
    <div>
      <h2>Current Touches:</h2>
      <ul>
        <For each={touches()}>
          {(touch) => <FingerPointer x={touch.x} y={touch.y} />}
        </For>
      </ul>
    </div>
  );
}

export default App;
