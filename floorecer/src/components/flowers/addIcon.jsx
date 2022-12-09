import React from "react";
import Svg, { Path, Rect } from "react-native-svg"

export function AddIcon() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="125"
      height="125"
      fill="none"
      viewBox="0 0 125 125"
    >
      <Path
        stroke="#9DA1DA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M26 37h10m10 0H36m0 0V26m0 11v11"
      ></Path>
      <Rect
        width="72"
        height="72"
        x="1"
        y="1"
        stroke="#9DA1DA"
        strokeWidth="2"
        rx="9"
      ></Rect>
    </Svg>
  );
}