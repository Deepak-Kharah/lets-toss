import { mergeProps } from "solid-js";
import "./FingerPointer.css";
import classNames from "classnames";

interface FingerPointerProps {
  x?: number;
  y?: number;
}

function FingerPointer(props: FingerPointerProps) {
  const processedProps = mergeProps<
    [Required<FingerPointerProps>, FingerPointerProps]
  >({ x: 150, y: 200 }, props);
  return (
    <li
      style={{
        left: `calc(${processedProps.x}px - ( var(--finger-pointer-size) / 2 ) )`,
        top: `calc(${processedProps.y}px - ( var(--finger-pointer-size) / 2 ) )`,
      }}
      class={classNames("finger-pointer")}
    ></li>
  );
}

export default FingerPointer;
