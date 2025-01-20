import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TextBox from "../custom/InputBox/TextBox";

describe("TextBox Component", () => {
    test("renders the text box ", () => {
        render(<TextBox label="Search" value="" onChange={() => {}} />);
        const labelElem = screen.getByLabelText(/search/i);
        expect(labelElem).toBeInTheDocument();
    });

    test("displays the correct input value", () => {
        render(<TextBox label="Search" value="Hello" onChange={() => {}} />);

        const inputElement = screen.getByRole("textbox");
        expect(inputElement).toHaveValue("Hello");
    });

    test("calls onChange handler when typing in the input", () => {
        const handleChange = jest.fn();
        render(<TextBox label="Search" value="" onChange={handleChange} />);

        const inputElement = screen.getByRole("textbox");
        fireEvent.change(inputElement, { target: { value: "New Value" } });

        expect(handleChange).toHaveBeenCalledTimes(1);
    });
    test("input is disabled when disabled prop is true", () => {
        render(<TextBox label="Search" value="" onChange={() => {}} disabled={true} />);

        const inputElement = screen.getByRole("textbox");
        expect(inputElement).toBeDisabled();
    });

    test("input is not disabled when disabled prop is false", () => {
        render(<TextBox label="Search" value="" onChange={() => {}} disabled={false} />);

        const inputElement = screen.getByRole("textbox");
        expect(inputElement).not.toBeDisabled();
    });
});
