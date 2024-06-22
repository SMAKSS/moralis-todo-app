import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { InfoSnackbar } from "./InfoSnackbar";
import { useTodoContext } from "@/context/TodoContext";
import { TodoActionTypes } from "@/context/TodoReducerTypes";

// Mock the useTodoContext hook
jest.mock("@/context/TodoContext", () => ({
  useTodoContext: jest.fn(),
}));

describe("InfoSnackbar", () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    // Mock the dispatch function
    (useTodoContext as jest.Mock).mockReturnValue({ dispatch });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should display the message when message is not null", () => {
    const message = "This is an info message";
    render(<InfoSnackbar message={message} />);

    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it("should not display the message when message is null", () => {
    render(<InfoSnackbar message={null} />);

    expect(
      screen.queryByText("This is an info message")
    ).not.toBeInTheDocument();
  });

  it("should call dispatch to clear message on close", () => {
    const message = "This is an info message";
    render(<InfoSnackbar message={message} />);

    // Simulate the close event
    fireEvent.click(screen.getByRole("button", { name: /close/i }));

    expect(dispatch).toHaveBeenCalledWith({
      type: TodoActionTypes.CLEAR_MESSAGE,
    });
  });
});
