import { vi, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("Renders the Modal with the default values", () => {
    // checks that a modal is not there at the beginning
    render(<App />);
    expect(screen.queryByRole("heading", { name: "Modal" })).toBeNull();

    // checks that a modal is there after opening it
    const openButton = screen.getByRole("button", { name: "Show Modal" });
    fireEvent.click(openButton);
    expect(screen.getByRole("heading", { name: "Modal" })).toBeDefined();

    // checks that a modal is NOT there after closing it
    const closeButton = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeButton);
    expect(screen.queryByRole("heading", { name: "Modal" })).toBeNull();
});
