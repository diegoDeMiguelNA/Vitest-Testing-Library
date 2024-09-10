import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import Modal from "./Modal";

test("Renders the Modal with the default values", () => {
  render(<Modal />);
  expect(screen.getByRole("heading").textContent).toBe("Modal");
  expect(screen.getByText("Are you sure?")).toBeDefined();
  expect(screen.getByRole("button", { name: "Close" })).toBeDefined();
  expect(screen.getByRole("button", { name: "Ok" })).toBeDefined();
  expect(screen.getByRole("button", { name: "Cancel" })).toBeDefined();
});

test("Renders the Modal with the passed values", () => {
  render(<Modal title="Delete Posts" text="Are you really sure?" />);
  expect(screen.getByRole("heading").textContent).toBe("Delete Posts");
  expect(screen.getByText("Are you really sure?")).toBeDefined();
});

test("Calls the onClose handler when clicked", () => {
  const onClose = vi.fn();
  render(<Modal onClose={onClose} />);
  const button = screen.getByRole("button", { name: "Close" });
  fireEvent.click(button);
  expect(onClose).toHaveBeenCalled();
});

test("Calls the onConfirm handler when clicked", () => {
  const onConfirm = vi.fn();
  render(<Modal onConfirm={onConfirm} />);
  const button = screen.getByRole("button", { name: "Ok" });
  fireEvent.click(button);
  expect(onConfirm).toHaveBeenCalledOnce();
});
