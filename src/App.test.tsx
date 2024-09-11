import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
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

test('Renders "Waiting for user interaction" when rendering App.tsx', () => {
  render(<App />);
  expect(screen.getByText("Waiting for user interaction")).toBeDefined();
});

test('Renders "Action Successful" when clicking Ok button', () => {
  render(<App />);
  fireEvent.click(screen.getByText(/Show Modal/i));
  const okButton = screen.getByRole("button", { name: /Ok/i });
  fireEvent.click(okButton);
  expect(screen.getByText("Action Successful")).toBeInTheDocument();
});

test('Renders "Action Canceled" when clicking Cancel button', () => {
  render(<App />);
  fireEvent.click(screen.getByText(/Show Modal/i));
  const okButton = screen.getByRole("button", { name: /Cancel/i });
  fireEvent.click(okButton);
  expect(screen.getByText("Action Canceled")).toBeInTheDocument();
});
