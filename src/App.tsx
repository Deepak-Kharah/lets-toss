import { createSignal } from "solid-js";
import "./App.css";
import TouchArea from "./PlayField/TouchArea";
import Navbar from "./Navbar/Navbar";

interface Finger {
  id: number;
  x: number;
  y: number;
}

export const [fingers, setFingers] = createSignal<Finger[]>([]);
export const [winnerFinger, setWinnerFinger] = createSignal<
  Finger | undefined
>();
export const [hasTossed, sethasTossed] = createSignal(false);

function App() {
  return (
    <>
      <Navbar />
      <TouchArea />
    </>
  );
}

export default App;
