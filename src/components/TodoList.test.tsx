import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { useRouter } from "next/router";
import TodoList from "@/components/TodoList";
import { fetchAllTodos } from "@/api/backend";
import { Todo } from "@/api/Todo";
import { useTodoContext } from "@/context/TodoContext";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/api/backend", () => ({
  fetchAllTodos: jest.fn(),
}));

jest.mock("@/context/TodoContext", () => ({
  useTodoContext: jest.fn(),
}));

const mockRouterPush = jest.fn();

(useRouter as jest.Mock).mockReturnValue({
  push: mockRouterPush,
});

const mockFetchAllTodos = fetchAllTodos as jest.Mock;

describe("TodoList Component", () => {
  const todos: Todo[] = [
    {
      id: 1,
      name: "Test Todo 1",
      description: "Test Description 1",
      done: false,
    },
    {
      id: 2,
      name: "Test Todo 2",
      description: "Test Description 2",
      done: true,
    },
  ];

  const mockContext = {
    state: {
      todos,
      error: "",
      successMessage: "",
      lastFetched: false,
    },
    dispatch: jest.fn(),
  };

  beforeEach(() => {
    (useTodoContext as jest.Mock).mockReturnValue(mockContext);
    mockFetchAllTodos.mockResolvedValue(todos);
  });

  it("renders the component with todos", async () => {
    await act(async () => {
      render(<TodoList />);
    });

    expect(screen.getByText(/Todos/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Todo 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Description 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Todo 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Description 2/i)).toBeInTheDocument();
  });

  it("handles 'Edit details' button click", async () => {
    await act(async () => {
      render(<TodoList />);
    });

    const editButton = screen.getAllByText(/Edit details/i)[0];
    fireEvent.click(editButton);

    expect(mockRouterPush).toHaveBeenCalledWith("/item/1");
  });

  it("displays error message if error exists", async () => {
    mockContext.state.error = "An error occurred";

    await act(async () => {
      render(<TodoList />);
    });

    expect(screen.getByText(/An error occurred/i)).toBeInTheDocument();
  });

  it("displays success message if successMessage exists", async () => {
    mockContext.state.successMessage = "Todo updated successfully";

    await act(async () => {
      render(<TodoList />);
    });

    expect(screen.getByText(/Todo updated successfully/i)).toBeInTheDocument();
  });
});
