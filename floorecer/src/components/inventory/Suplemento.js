import * as React from "react";
import Svg, { G, Path, Defs } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const Suplemento = (props) => (
  <Svg
    width={130}
    height={130}
    viewBox="0 0 34 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G filter="url(#filter0_b_386_34)">
      <Path
        d="M11.0449 1.22716C11.0449 0.549418 11.5943 0 12.2721 0H21.4758C22.1535 0 22.7029 0.549418 22.7029 1.22716V3.68148H11.0449V1.22716Z"
        fill="#0C4D53"
        fillOpacity={0.45}
      />
      <Path
        d="M0 16.3623H33.7469V34.2584C33.7469 37.6471 30.9998 40.3942 27.6111 40.3942H6.1358C2.74709 40.3942 0 37.6471 0 34.2584V16.3623Z"
        fill="#FC9FB0"
      />
      <Path
        d="M12.2721 0C11.5943 0 11.0449 0.549418 11.0449 1.22716L11.045 9.93323H6.16217C2.77346 9.93323 0.0263672 12.6803 0.0263672 16.069V33.8629C0.0263672 37.2516 2.77346 39.9986 6.16217 39.9986H27.6375C31.0262 39.9986 33.7733 37.2516 33.7733 33.8629V16.069C33.7733 12.6803 31.0262 9.93323 27.6375 9.93323H22.703L22.7029 1.22716C22.7029 0.549418 22.1535 0 21.4758 0H12.2721Z"
        fill="#6581A1"
        fillOpacity={0.2}
      />
    </G>
    <Defs></Defs>
  </Svg>
);
export default Suplemento;
