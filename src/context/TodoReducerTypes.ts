import { Todo } from "@/api/Todo";

export interface TodoState {
  /**
   * The list of todos.
   */
  todos: Todo[];
  /**
   * The error message.
   */
  error: string | null;
  /**
   * The timestamp when the todos were last fetched.
   */
  lastFetched: number | null;
  /**
   * A boolean indicating whether all todos have been fetched.
   */
  allTodosFetched: boolean;
  /**
   * The success message.
   */
  successMessage: string | null;
}

export enum TodoActionTypes {
  /**
   * Reset the todos state to the initial state.
   */
  SET_TODOS = "SET_TODOS",
  /**
   * Update a todo.
   */
  UPDATE_TODO = "UPDATE_TODO",
  /**
   * Delete a todo.
   */
  DELETE_TODO = "DELETE_TODO",
  /**
   * Set an error message.
   */
  SET_ERROR = "SET_ERROR",
  /**
   * Set a success message.
   */
  SET_MESSAGE = "SET_MESSAGE",
  /**
   * Clear the error message.
   */
  CLEAR_MESSAGE = "CLEAR_MESSAGE",
}

export type TodoAction =
  | { type: TodoActionTypes.SET_TODOS; payload: Todo[] }
  | { type: TodoActionTypes.UPDATE_TODO; payload: Todo }
  | { type: TodoActionTypes.DELETE_TODO; payload: number }
  | { type: TodoActionTypes.SET_ERROR; payload: string }
  | { type: TodoActionTypes.SET_MESSAGE; payload: string }
  | { type: TodoActionTypes.CLEAR_MESSAGE };
