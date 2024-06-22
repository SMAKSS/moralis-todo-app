import { initialState, todoReducer } from "./TodoReducer";
import { TodoActionTypes, TodoAction, TodoState } from "./TodoReducerTypes";
import { Todo } from "@/api/Todo";

const sampleTodo: Todo = {
  id: 1,
  name: "Sample Todo",
  description: "This is a sample todo",
  done: false,
};

describe("todoReducer", () => {
  it("should return the initial state when no action is provided", () => {
    expect(todoReducer(initialState, {} as TodoAction)).toEqual(initialState);
  });

  it("should handle SET_TODOS", () => {
    const action: TodoAction = {
      type: TodoActionTypes.SET_TODOS,
      payload: [sampleTodo],
    };
    const expectedState: TodoState = {
      ...initialState,
      todos: [sampleTodo],
      lastFetched: expect.any(Number),
      allTodosFetched: true,
    };

    expect(todoReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle UPDATE_TODO with existing todo", () => {
    const initialStateWithTodo: TodoState = {
      ...initialState,
      todos: [sampleTodo],
    };
    const updatedTodo: Todo = { ...sampleTodo, name: "Updated Todo" };
    const action: TodoAction = {
      type: TodoActionTypes.UPDATE_TODO,
      payload: updatedTodo,
    };
    const expectedState: TodoState = {
      ...initialState,
      todos: [updatedTodo],
    };

    expect(todoReducer(initialStateWithTodo, action)).toEqual(expectedState);
  });

  it("should handle UPDATE_TODO with new todo", () => {
    const newTodo: Todo = { ...sampleTodo, id: 2 };
    const action: TodoAction = {
      type: TodoActionTypes.UPDATE_TODO,
      payload: newTodo,
    };
    const expectedState: TodoState = {
      ...initialState,
      todos: [newTodo],
    };

    expect(todoReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle DELETE_TODO", () => {
    const initialStateWithTodo: TodoState = {
      ...initialState,
      todos: [sampleTodo],
    };
    const action: TodoAction = {
      type: TodoActionTypes.DELETE_TODO,
      payload: sampleTodo.id,
    };
    const expectedState: TodoState = {
      ...initialState,
      todos: [],
    };

    expect(todoReducer(initialStateWithTodo, action)).toEqual(expectedState);
  });

  it("should handle SET_ERROR", () => {
    const errorMessage = "An error occurred";
    const action: TodoAction = {
      type: TodoActionTypes.SET_ERROR,
      payload: errorMessage,
    };
    const expectedState: TodoState = {
      ...initialState,
      error: errorMessage,
    };

    expect(todoReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle SET_MESSAGE", () => {
    const successMessage = "Operation successful";
    const action: TodoAction = {
      type: TodoActionTypes.SET_MESSAGE,
      payload: successMessage,
    };
    const expectedState: TodoState = {
      ...initialState,
      successMessage,
    };

    expect(todoReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle CLEAR_MESSAGE", () => {
    const initialStateWithMessage: TodoState = {
      ...initialState,
      successMessage: "Operation successful",
    };
    const action: TodoAction = {
      type: TodoActionTypes.CLEAR_MESSAGE,
    };
    const expectedState: TodoState = {
      ...initialState,
      successMessage: null,
    };

    expect(todoReducer(initialStateWithMessage, action)).toEqual(expectedState);
  });
});
