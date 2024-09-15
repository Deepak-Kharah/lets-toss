import { createSignal, onMount } from "solid-js";
import "./Navbar.css";
import classNames from "classnames";

export const [canVibrate, setCanVibrate] = createSignal(true);

function Navbar() {
  onMount(() => {
    try {
      const canVibrateLocalstorage = localStorage.getItem("canVibrate");
      if (canVibrateLocalstorage) {
        setCanVibrate(!!JSON.parse(canVibrateLocalstorage));
        return;
      }
    } catch (e) {
      console.error(e);
    }
  });

  return (
    <nav>
      <h1>Let's toss</h1>
      <button
        class={classNames("vibrate-button", {
          "vibrate-button--disabled": !canVibrate(),
        })}
        onClick={toggleVibrate}
      >
        vibrate
      </button>
    </nav>
  );
}

export default Navbar;

function toggleVibrate() {
  const newValue = !canVibrate();
  setCanVibrate(newValue);
  localStorage.setItem("canVibrate", JSON.stringify(newValue));
}
