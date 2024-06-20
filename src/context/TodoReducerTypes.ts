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
}

export type TodoAction =
  | { type: TodoActionTypes.SET_TODOS; payload: Todo[] }
  | { type: TodoActionTypes.UPDATE_TODO; payload: Todo }
  | { type: TodoActionTypes.DELETE_TODO; payload: number }
  | { type: TodoActionTypes.SET_ERROR; payload: string };
