import { mergeProps } from "solid-js";
import "./FingerPointer.css";

interface FingerPointerProps {
  x?: number;
  y?: number;
}

function FingerPointer(props: FingerPointerProps) {
  const processedProps = mergeProps({ x: 150, y: 200 }, props);
  return (
    <li
      style={{
        position: "absolute",
        left: `calc(${processedProps.x}px - ( var(--finger-pointer-size) / 2 ) )`,
        top: `calc(${processedProps.y}px - ( var(--finger-pointer-size) / 2 ) )`,
      }}
      class="finger-pointer"
    ></li>
  );
}

export default FingerPointer;
