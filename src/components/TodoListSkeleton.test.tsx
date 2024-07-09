import React from "react";
import { render, screen } from "@testing-library/react";
import { TodoListSkeleton } from "./TodoListSkeleton";

describe("TodoListSkeleton", () => {
  it("should render the skeleton loaders correctly", () => {
    render(<TodoListSkeleton />);
    const container = screen.getByTestId("todo-list-skeleton");
    expect(container).toBeInTheDocument();

    const textSkeleton = screen.getByTestId("loading-text");
    const rectSkeletons = screen.getAllByTestId("loading-rectangular");

    expect(textSkeleton).toBeInTheDocument();
    expect(rectSkeletons.length).toBe(8); // Assuming NUMBER_OF_SKELETONS is 8
  });
});
