# Testing Library Example

This repository contains a React component unit testing example, and some challenges to add further tests.

## Installation and usage

```text
# Install deps
$ npm install

# Run the app locally
$ npm run dev

# Run the tests
$ npm run test
```

## Review of some concepts

To test some portion of code means to run it in a controlled environment and to evaluate the output of such excecution. There are various kinds of tests, among them:

-   **unit tests**: test code (functions, components) in the most isolated way possible;
-   **integration tests**: test the interaction between single units to an higher level of cohesion;
-   **end to end tests**: test some whole application process (e.g. registration, cart checkout) at user experience level.

In this example we'll focus mainly on unit tests.

## What to we need for testing

Besides the actual code to test, we'll need some **assertion library** (e.g. Jest, Mocha, Vitest) and often some additional tools. This project runs a **vite-react** template and is tested via [vitest][vitest], with the aid of [testing-library][testing-library] to test the actual component rendering.

## A pure functional example

Let's consider the following function:

```ts
export default function sayHello(name = "Mr. X", time = 10) {
    if (time > 12) {
        return `Good afternoon, ${name}`;
    }
    return `Good morning, ${name}`;
}
```

We want to make sure all the following scenarios are respected:

```ts
// returns Good morning, Mr. X
sayHello();

// returns Good morning, Diego
sayHello("Diego");

// returns Good morning, Diego
sayHello("Diego", 9);

// returns Good afternoon, Diego
sayHello("Diego", 14);
```

We could run the code manually somehow, log the outputs and decide whether the functions is behaving like we want. This will be tedious if we have many functions in our project!

An assertion library allows us to write a `sayHello.test.ts` like:

```ts
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
```

Running `npm run test` in the terminal would produce the following output:

```txt
 sayHello.ts x2

 ✓ sayHello.test.ts (4)
   ✓ Returns Good morning, Mr. X when no arguments are passed
   ✓ Returns Good morning, {name} when the name is passed
   ✓ Returns Good morning, {name} when the name and a time <= 12 are passed
   ✓ Returns Good afternoon, {name} when the name and a time > 12 are passed

 Test Files  1 passed (1)
      Tests  4 passed (4)
   Start at  12:50:18
   Duration  72ms

PASS  Waiting for file changes...
```

All the tests are passing, great! Let's see what would happen if we accidentally mess with the original code by replacing "afternoon" with "evening":

```ts
export default function sayHello(name = "Mr. X", time = 10) {
    if (time > 12) {
        return `Good evening, ${name}`;
    }
    return `Good morning, ${name}`;
}
```

```txt
❯ sayHello.test.ts (4)
   ✓ Returns Good morning, Mr. X when no arguments are passed
   ✓ Returns Good morning, {name} when the name is passed
   ✓ Returns Good morning, {name} when the name and a time <= 12 are passed
   × Returns Good afternoon, {name} when the name and a time > 12 are passed

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  sayHello.test.ts > Returns Good afternoon, {name} when the name and a time > 12 are passed
AssertionError: expected 'Good evening, Diego' to be 'Good afternoon, Diego' // Object.is equality

Expected: "Good afternoon, Diego"
Received: "Good evening, Diego"

 ❯ sayHello.test.ts:17:33
     15|
     16| test("Returns Good afternoon, {name} when the name and a time > 12 are passed", () => {
     17|   expect(sayHello("Diego", 14)).toBe("Good afternoon, Diego");
       |                                 ^
     18| });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯

 Test Files  1 failed (1)
      Tests  1 failed | 3 passed (4)
   Start at  12:50:01
   Duration  104ms
```

We'll get some nasty feedback about some expectation not being met, and if the test suit would run on some Continous Integration environment for instance, that would prevent any further operations from proceeding. This is incredibly useful because it tells us that some changes that we introduced to some existing code are going to break it. Of course we could have updated the test file instead of the reverting the original function: that depends on what the actual software requirements are.

## How many unit tests to write

That's a good question. Every decision path should be tested. If a function offers too many paths it's a sign that it's perhaps taking too many decisions, and that it would be split in multiple functions. Our `sayHello` function takes three decisions:

-   defaults the `name` to "Mr. X" if no name is passed;
-   defaults the `time` to 10 if no time is passed;
-   returns "morning" or "afternoon" depending on the time passed.

To cover all the cases, we need to pass:

-   no args at all: `sayHello()`;
-   just the name: `sayHello('Diego')`;
-   the name and a time <= 12: `sayHello('Diego', 9)`;
-   the name and a time > 12: `sayHello('Diego', 14)`.

It looks like a lot of work, but we are talking about literally two minutes overhead that are going to pay themselves off on the first bug prevention. Do yourself a favour and unit test your code!

## Testing React components

Testing pure functions is easy: it's all about checking what they return depending on the passed arguments. React components are expected to be mounted on some DOM environment, to change what they render based on the passed props or the internal state. We need some additional tool for that, and `testing-library` is a good companion for that.

Let's have a look at our `Modal` component:

```tsx
import type { FC } from "react";

type ModalProps = {
    title?: string;
    text?: string;
    onClose?: () => void;
};

const Modal: FC<ModalProps> = ({
    title = "Modal",
    text = "Are you sure?",
    onClose = () => {},
}) => {
    return (
        <div className="Modal">
            <div className="Modal-content">
                <button
                    className="Modal-close"
                    onClick={onClose}
                    aria-label="Close"
                >
                    &times;
                </button>
                <h2>{title}</h2>
                <p>{text}</p>
                <div className="Modal-actions">
                    <button className="primary">Ok</button>
                    <button>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
```

It accepts three props: `title` and `text` to decide what to display inside it, and and `onClose` callback that gets called when clicking on the close button. Mind that the poor modal is not aware of its surroundings, and that calling `onClose` could eventually end in unmounting itself from the DOM!

```tsx
import { useState } from "react";
import Modal from "./Modal.tsx";

function App() {
    const [showModal, setShowModal] = useState(false);

    function onClose() {
        setShowModal(false);
    }

    function openModal() {
        setShowModal(true);
    }

    return (
        <div className="app">
            <h1>Testing Library Example</h1>
            <button onClick={openModal}>Show Modal</button>
            {showModal && <Modal onClose={onClose} />}
        </div>
    );
}
```

The `onClose` function will call `setShowModal(false)`. So goes life. But the responsibility of the modal is just to call the passed function when clicking on the close button, not to take any further decisions.

### Testing the scalar props

Let's first check that the passed text props are correctly rendered on screen:

```tsx
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "./Modal";

test("Renders the Modal with the default values", () => {
    render(<Modal />);
    expect(screen.getByRole("heading").textContent).toBe("Modal");
    expect(screen.getByText("Are you sure?")).toBeDefined();
});

test("Renders the Modal with the passed values", () => {
    render(<Modal title="Delete Post" text="Are you really sure?" />);
    expect(screen.getByRole("heading").textContent).toBe("Delete Post");
    expect(screen.getByText("Are you really sure?")).toBeDefined();
});
```

Let's just focus on the big picture: the first test renders the modal without passing any props, and the default values are checked, while the second test is passing some props.

Now `testing-library` has some learning curve, but [the documentation][testing-library-docs] is there for a thing! The `render` function takes JSX code and simulates some mount operation, while `screen` offers some DOM query-alike helpers to determine if the rendered HTML matches our expectations. The library is very accessibility oriented so we can test our code from different angles.

It's important to note that there are various approaches in React component testing, as there have been different library eras (enzyme, react-testing-library, etc...). Sometimes you'll see `id` attributes given to component portions used to query the rendered output, sometimes direct `screen.getByText`/`screen.getByRole` calls. It should be a team-wide consensus.

### Testing user interactions

We want to make sure that the passed `onClose` function is called when the user closes the modal. We need to be a little nosy for that, and invite a couple of more tools to the party:

```tsx
import { vi, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "./Modal";

test("Calls the onClose handler when clicked", () => {
    const onClose = vi.fn();
    render(<Modal onClose={onClose} />);
    const button = screen.getByRole("button", { name: "Close" });
    fireEvent.click(button);
    expect(onClose).toHaveBeenCalled();
});
```

We are creating an `onClose` dummy function, that we can ask whether it has been called or not, thanks to the `vi` library. This is usually called a **spy function**. We render the modal making sure we passed our little spy, then thanks to the imported `fireEvent` method we simulate a click.

The `expect` assertion checker is smart enough to know if we passed a spy or not, and allows us to call `.toHaveBeenCalled()`. Great, we tested a click interaction without clicking anywhere!

How can we break things? Check what happens if you edit the button `aria-label` attribute to anything else. The tests are very strict, and work just if the component and the test code match. Please roll your changes back to make the tests green again, now rename the `onClose` prop to something else (without touching the test file): again, test failed!

If for any reason you decide to rename the `onClose` prop to anything that makes more sense to you, you'll have to update the test file accordingly. The great benefit is that if the modal component is used in any other test, they'll fail if you don't update them! This is great if you are touching thing in an existing (tested) project. Things can still go south, but you cannot say we haven't warned you.

## An integration test example

We unit tested the modal by checking that the texts are fine, and that the passed function is called. How can we test if the modal actually pops up and goes away? First let's make sure it happens in our browser by checking the actual app behaviour. Then we can test the App component like:

```tsx
// Note: we need queryByRole as opposed to getByRole in the case the result may be null
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
```

The whole thing just automates the user interaction. Observe how the modal component is never mentioned in the `App.test.tsx` file! We are just testing some button behaviour. That makes this an **integration test** between different components. Of course we need some knowledge about the button labels in order to query them. Observe also how we made no assumptions about the internal state of the App component: we just care about the ultimate screen behaviour, that should be defined in some user story.

## Challenges

### Bind the OK and Cancel buttons

The modal component exposes just the `onClose` prop for now. Let's make sure we can do something `onConfirm` and `onCancel` too! Make sure to add some unit tests accordingly. Try to do that without touching anything in `App.tsx` and by writing some failing tests first, making it really in TDD (test-driven-development) style.

### Add some App behaviour

To keep it simple, add some text element in `App.jsx` that keeps track on which action the user took: if they clicked on OK display "Action Successful", if they did on Cancel display "Action Canceled". If they still have to click on anything, display "Waiting for user interaction".

Have fun!

[vitest]: https://vitest.dev/
[testing-library]: https://testing-library.com/
[testing-library-docs]: https://testing-library.com/docs/
