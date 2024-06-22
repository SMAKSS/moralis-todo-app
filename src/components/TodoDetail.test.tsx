import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/router";
import TodoDetail from "@/components/TodoDetail";
import { useTodoContext } from "@/context/TodoContext";
import { Todo } from "@/api/Todo";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/api/backend", () => ({
  updateOneTodo: jest.fn(),
  deleteTodoById: jest.fn(),
}));

jest.mock("@/context/TodoContext", () => ({
  useTodoContext: jest.fn(),
}));

const mockRouterPush = jest.fn();

(useRouter as jest.Mock).mockReturnValue({
  push: mockRouterPush,
});

describe("TodoDetail Component", () => {
  const editableItem: Todo = {
    id: 1,
    name: "Test Todo",
    description: "Test Description",
    done: false,
  };

  const mockSetEditableItem = jest.fn();

  const mockContext = {
    state: {
      todos: [editableItem],
      error: null,
      successMessage: null,
    },
    dispatch: jest.fn(),
  };

  beforeEach(() => {
    (useTodoContext as jest.Mock).mockReturnValue(mockContext);
  });

  it("renders the component", () => {
    render(
      <TodoDetail
        editableItem={editableItem}
        setEditableItem={mockSetEditableItem}
      />
    );

    expect(screen.getByLabelText(/Name/i)).toHaveValue(editableItem.name);
    expect(screen.getByLabelText(/Description/i)).toHaveValue(
      editableItem.description
    );
    expect(screen.getByLabelText(/Done/i)).not.toBeChecked();
  });

  it("handles input change", () => {
    render(
      <TodoDetail
        editableItem={editableItem}
        setEditableItem={mockSetEditableItem}
      />
    );

    const nameInput = screen.getByLabelText(/Name/i);
    fireEvent.change(nameInput, { target: { value: "Updated Todo" } });

    expect(mockSetEditableItem).toHaveBeenCalledWith({
      ...editableItem,
      name: "Updated Todo",
    });
  });

  it("navigates back to the list", () => {
    render(
      <TodoDetail
        editableItem={editableItem}
        setEditableItem={mockSetEditableItem}
      />
    );

    const backButton = screen.getByLabelText(/Back to todo list/i);
    fireEvent.click(backButton);

    expect(mockRouterPush).toHaveBeenCalledWith("/");
  });
});
