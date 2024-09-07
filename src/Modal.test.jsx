import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { fireEvent } from "@testing-library/react";
import Modal from "./Modal";
const fn = vi.fn();

test("Renders the Modal with the default labels", () => {
    render(<Modal />);
    expect(screen.getByRole("heading")).toHaveTextContent("Modal");
    expect(screen.getByText("Are you sure?")).toBeDefined();
    expect(screen.getByRole("button", { name: /close/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /ok/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeDefined();
});

test("Calls the onClose handler when clicked", () => {
    const onClose = vi.fn();
    render(<Modal onClose={onClose} />);
    const button = screen.getByRole("button", { name: /close/i });
    fireEvent.click(button);
    expect(onClose).toHaveBeenCalled();
});
