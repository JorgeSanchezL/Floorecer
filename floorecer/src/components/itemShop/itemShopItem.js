import * as React from "react";
import Svg, { Path, G, Defs, LinearGradient, Stop } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
import {Dimensions} from 'react-native'
const { width, height } = Dimensions.get('screen');
const SVGComponent = (props) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 386 814"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M12 29C12 15.1929 23.1929 4 37 4L168 4C181.807 4 193 15.1929 193 29V47C193 60.8071 204.193 72 218 72L349 72C362.807 72 374 83.1929 374 97L374 769C374 782.807 362.807 794 349 794H37C23.1929 794 12 782.807 12 769L12 29Z"
      fill="url(#paint0_linear_607_57)"
    />
    <G filter="url(#filter0_bd_607_57)">
      <Path
        d="M12 29C12 15.1929 23.1929 4 37 4H168C181.807 4 193 15.1929 193 29V47C193 60.8071 204.193 72 218 72H349C362.807 72 374 83.1929 374 97V769C374 782.807 362.807 794 349 794H37C23.1929 794 12 782.807 12 769V29Z"
        fill="white"
        fillOpacity={0.2}
        shapeRendering="crispEdges"
      />
    </G>
    <Defs>
      <LinearGradient
        id="paint0_linear_607_57"
        x1={56.5}
        y1={39.5}
        x2={69.5}
        y2={794}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#7D7ACD" />
        <Stop offset={1} stopColor="#9795D7" stopOpacity={0} />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default SVGComponent;
