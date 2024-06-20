import { TodoAction, TodoActionTypes, TodoState } from "./TodoReducerTypes";

export const initialState: TodoState = {
  /**
   * The list of todos.
   */
  todos: [],
  /**
   * The error message.
   */
  error: null,
  /**
   * The timestamp when the todos were last fetched.
   */
  lastFetched: null,
};

/**
 * The reducer function for the todo context.
 * @param {TodoState} state - The current state of the todo context.
 * @param {TodoAction} action - The action to be performed.
 * @returns {TodoState} The new state of the todo context.
 */
export function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case TodoActionTypes.SET_TODOS:
      return {
        ...state,
        todos: action.payload,
        error: null,
        lastFetched: Date.now(),
      };
    case TodoActionTypes.UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
        error: null,
      };
    case TodoActionTypes.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
        error: null,
      };
    case TodoActionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
