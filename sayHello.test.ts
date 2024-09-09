import { expect, test } from "vitest";
import sayHello from "./sayHello.ts";

test("Returns Good morning, Mr. X when no arguments are passed", () => {
  expect(sayHello()).toBe("Good morning, Mr. X");
});

test("Returns Good morning, {name} when the name is passed", () => {
  expect(sayHello("Diego")).toBe("Good morning, Diego");
});

test("Returns Good morning, {name} when the name and a time <= 12 are passed", () => {
  expect(sayHello("Diego", 9)).toBe("Good morning, Diego");
});

test("Returns Good afternoon, {name} when the name and a time > 12 are passed", () => {
  expect(sayHello("Diego", 14)).toBe("Good afternoon, Diego");
});