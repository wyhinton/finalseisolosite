// import {
//   createStore,
//   action,
//   Action,
//   createTypedHooks,
//   StoreProvider,
//   createContextStore,
// } from "easy-peasy";
// import { Thunk } from "easy-peasy";
// import React from "react";
// import { useContextBridge } from "@react-three/drei";
// import { Canvas } from "@react-three/fiber";

// //Create Basic Store
// interface Todo {
//   text: string;
//   done: boolean;
// }

// interface StoreModel {
//   todos: Todo[];
// }

// interface TodosModel {
//   todos: Todo[];
//   addTodo: Action<TodosModel, Todo>;
//   saveTodo: Action<TodosModel, Todo>;
// }

// const store = createStore<TodosModel>({
//   todos: [],
//   addTodo: action((state, payload) => {
//     state.todos.push(payload);
//   }),
//   saveTodo: action((state, payload) => {
//     state.todos.push(payload);
//   }),
// });

// //create typed hooks for store
// const typedHooks = createTypedHooks<StoreModel>();

// export const useStoreActions = typedHooks.useStoreActions;
// export const useStoreDispatch = typedHooks.useStoreDispatch;
// export const useStoreState = typedHooks.useStoreState;

// const App = (): JSX.Element => {
//   const todos = useStoreState((state) => state.todos);
//   //Create a context bridge
//   const CounterStore = createContextStore(store);
//   const ContextBridge = useContextBridge(CounterStore);

//   return (
//     <section>
//       <StoreProvider store={store}>
//         <ul>
//           {todos.map((todo) => (
//             <li>{todo.text}</li>
//           ))}
//         </ul>
//       </StoreProvider>
//     </section>
//   );
// };

// export default App;

export default null;
