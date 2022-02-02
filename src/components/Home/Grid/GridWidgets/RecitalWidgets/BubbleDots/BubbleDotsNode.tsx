import theme from "@static/theme";
import React, {
  useState,
  useEffect,
  useRef,
  RefAttributes,
  FC,
  forwardRef,
} from "react";
import { Shaders, Node, GLSL, connectSize } from "gl-react";
import BubbleShader from "../BubbleShader";
import canvasLoop from "../../../../../../canvasLoop";
import { animated, AnimatedComponent, useSpring } from "@react-spring/three";
// import canvasLoop from "@canvasLoop";

const BubbleDotsNode = ({
  time,
  resolution,
  isHover,
  activeInd,
  offset,
  isAnimate,
}: {
  time: number;
  resolution: [number, number];
  activeInd: number;
  offset: [number, number];
  isHover: number;
  isAnimate: number;
}): JSX.Element => {
  const col = theme.secondaryRGB.map((c) => c / 255);
  const [endtime, setEndTime] = useState(500);

  useEffect(() => {
    // console.log(isAnimate);
    if (isAnimate == 1) {
      setEndTime(time + 500);
    } else {
      setEndTime(0);
    }
  }, [isAnimate]);
  return (
    <Node
      shader={BubbleShader.bubbleShader}
      uniforms={{
        // u_time: time,
        // end_time: endtime,
        isHover: isHover,
        activeInd: activeInd,
        color: col,
        u_resolution: resolution,
        u_mouse: offset,
        // isAnimate: isAnimate,
      }}
    />
  );
};

export default canvasLoop(BubbleDotsNode);

// export interface CompProps extends Node {
//   time: number;
//   resolution: [number, number];
//   activeInd: number;
//   offset: [number, number];
//   isHover: number;
//   isAnimate: number;
//   shader: ShaderIdentifier | ShaderDefinition;
//   //   onChangeColor: () => void;
// }

// const Comp: FC<CompProps & RefAttributes<Node>> = forwardRef<Node, CompProps>(
//   (props, ref) => {
//     console.log("Rendered Comp6");

//     //   return <div ref={ref} style={props.style} onClick={props.onChangeColor} />;
//     return <Node {...props} />;
//   }
// );

// const WrappedComp: AnimatedComponent<FC<CompProps & RefAttributes<Node>>> =
//   animated(Comp);

// const Parent: FC = () => {
//   const [springColor, api] = useSpring(() => ({ backgroundColor: "green" }));

//   return (
//     <WrappedComp
//       shader={BubbleShader.bubbleShader}
//       uniforms={{
//         u_time: time,
//         isHover: isHover,
//         activeInd: activeInd,
//         color: col,
//         u_resolution: resolution,
//         u_mouse: offset,
//         isAnimate: isAnimate,
//       }}
//     />
//   );
// };
