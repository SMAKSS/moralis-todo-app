import React from "react";
import { act, render, screen } from "@testing-library/react";
import { TodoProvider, useTodoContext } from "./TodoContext";
import { TodoActionTypes } from "./TodoReducerTypes";

// A test component to use the context
const TestComponent = () => {
  const { state, dispatch } = useTodoContext();

  return (
    <div>
      <span data-testid="todos-count">{state.todos.length}</span>
      <button
        data-testid="add-todo"
        onClick={() =>
          dispatch({
            type: TodoActionTypes.SET_TODOS,
            payload: [
              {
                id: 1,
                name: "Test Todo",
                description: "Test Description",
                done: false,
              },
            ],
          })
        }
      >
        Add Todo
      </button>
    </div>
  );
};

describe("TodoContext", () => {
  it("should throw error when useTodoContext is used outside of TodoProvider", () => {
    // Suppress console.error for this test
    const consoleError = console.error;
    console.error = jest.fn();

    expect(() => render(<TestComponent />)).toThrow(
      "useTodoContext must be used within a TodoProvider"
    );

    // Restore console.error
    console.error = consoleError;
  });

  it("should provide initial state from TodoProvider", () => {
    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    const todosCount = screen.getByTestId("todos-count");
    expect(todosCount.textContent).toBe("0");
  });

  it("should update state when dispatch is called", () => {
    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    const addButton = screen.getByTestId("add-todo");

    act(() => {
      addButton.click();
    });

    const todosCount = screen.getByTestId("todos-count");
    expect(todosCount.textContent).toBe("1");
  });
});
