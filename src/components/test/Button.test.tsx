import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button";

describe("Button Component", () => {
    // test on button text content
    test("renders button with text content", () => {
        render(<Button theme="light" content="Click Me" />);
        const buttonElem = screen.getByRole("button", { name: /click me/i });
        expect(buttonElem).toBeInTheDocument();
        expect(buttonElem).toHaveTextContent("CLICK ME");
    });

    // test on disabled props passed
    test("button is disabled when disabled prop is true", () => {
        render(<Button theme="light" content="Click Me" disabled={true} />);

        const buttonElement = screen.getByRole("button", { name: /click me/i });
        expect(buttonElement).toBeDisabled();
    });

    test("button is disabled when disabled prop is false", () => {
        render(<Button theme="light" content="Click Me" disabled={false} />);

        const buttonElement = screen.getByRole("button", { name: /click me/i });
        expect(buttonElement).toBeEnabled();
    });
    // test on onClick event handler
    test("call onClick handler once the button is clicked", () => {
        const handleClick = jest.fn();
        render(<Button theme="light" content="Click Me" onClick={handleClick} />);

        const buttonElement = screen.getByRole("button", { name: /click me/i });
        fireEvent.click(buttonElement);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    //test on classname passed as prop
    test("applies correct classes based on theme prop", () => {
        const { rerender } = render(<Button theme="dark" content="Dark Theme" />);

        const buttonElement = screen.getByRole("button", { name: /dark theme/i });
        expect(buttonElement).toHaveClass("bg-black text-white");

        rerender(<Button theme="light" content="Light Theme" />);
        expect(buttonElement).toHaveClass("bg-white text-black");
    });
});
