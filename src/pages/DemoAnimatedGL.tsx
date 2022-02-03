// import React, { Component, useState } from "react";
// import { useSpring, animated } from "react-spring";

// const ExampleFunctionalComponent = ({ val }: { val: number }) => (
//   <div>{val}</div>
// );
// const AnimatedFunctionalComponent = animated(ExampleFunctionalComponent);

// interface CP {
//   val: number;
// }

// class ExampleClassComponent extends Component<CP> {
//   render() {
//     const { val } = this.props;
//     return <div>{val}</div>;
//   }
// }
// const AnimatedClassComponent = animated(ExampleClassComponent);

// const DemoAnimatedGL = () => {
//   const [targetVal, setTargetVal] = useState(0);
//   const props = useSpring({ val: targetVal });
//   return (
//     <div className="App">
//       <h1>Animate parameter from 0 to 100</h1>
//       Functional component (wrapped with animated):
//       <AnimatedFunctionalComponent val={props.val} />
//       <br />
//       Class component (wrapped with animated)
//       <AnimatedClassComponent val={props.val} />
//       <br />
//       <button
//         onClick={(e) => {
//           console.log("clicked button");
//           setTargetVal(100);
//         }}
//       >
//         Animate!
//       </button>
//     </div>
//   );
// };

export default null;
