import * as React from "react";
import Svg, { Circle } from "react-native-svg";
const Sun = (props) => (
  <Svg
    width={54}
    height={54}
    viewBox="0 0 54 54"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle r={27} transform="matrix(-1 0 0 1 27 27)" fill="#FFE600" />
  </Svg>
);
export default Sun;
