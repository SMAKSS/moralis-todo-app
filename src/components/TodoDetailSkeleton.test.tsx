import React from "react";
import { render, screen } from "@testing-library/react";
import { TodoDetailSkeleton } from "./TodoDetailSkeleton";

describe("TodoDetailSkeleton", () => {
  it("should render the skeleton loaders correctly", () => {
    render(<TodoDetailSkeleton />);
    const container = screen.getByTestId("todo-detail-skeleton");
    expect(container).toBeInTheDocument();

    const textSkeleton = screen.getByTestId("loading-text");
    const rectSkeleton = screen.getByTestId("loading-rectangular");

    expect(textSkeleton).toBeInTheDocument();
    expect(rectSkeleton).toBeInTheDocument();
  });
});
