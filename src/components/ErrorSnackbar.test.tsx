import React from "react";
import { render, screen } from "@testing-library/react";
import { ErrorSnackbar } from "./ErrorSnackbar";

describe("ErrorSnackbar", () => {
  it("should display the error message when error is not null", () => {
    const errorMessage = "This is an error message";
    render(<ErrorSnackbar error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("should not display the error message when error is null", () => {
    render(<ErrorSnackbar error={null} />);

    expect(
      screen.queryByText("This is an error message")
    ).not.toBeInTheDocument();
  });
});
