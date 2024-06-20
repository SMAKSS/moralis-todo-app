export interface Todo {
  /**
   * The id of the todo.
   */
  id: number;
  /**
   * The name of the todo.
   */
  name: string;
  /**
   * The description of the todo.
   */
  description: string;
  /**
   * Whether the todo is done.
   */
  done: boolean;
}
