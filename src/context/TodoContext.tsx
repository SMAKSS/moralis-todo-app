import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useMemo,
} from "react";
import { initialState, todoReducer } from "./TodoReducer";
import { TodoAction, TodoState } from "./TodoReducerTypes";

export interface TodoContextProps {
  /**
   * The state of the todo context.
   */
  state: TodoState;
  /**
   * The dispatch function of the todo context.
   */
  dispatch: React.Dispatch<TodoAction>;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

interface TodoProviderProps {
  readonly children: ReactNode;
}

/**
 * Provides the Todo context to its children.
 * @param {TodoProviderProps} props - The props of the TodoProvider.
 * @returns {JSX.Element} The Todo context provider.
 */
export function TodoProvider(props: TodoProviderProps): JSX.Element {
  const { children } = props;
  const [state, dispatch] = useReducer<React.Reducer<TodoState, TodoAction>>(
    todoReducer,
    initialState
  );

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

/**
 * Custom hook to use the Todo context.
 * @throws Will throw an error if used outside of the TodoProvider.
 * @returns {TodoContextProps} The state and dispatch function from the Todo context.
 */
export function useTodoContext(): TodoContextProps {
  const context = useContext(TodoContext);

  if (context === undefined) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }

  return context;
}
