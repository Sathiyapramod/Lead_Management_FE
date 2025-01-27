import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../SearchBar";

describe("Searchbar", () => {
    test("renders searchbar", () => {
        render(<SearchBar placeholder="Search bar" onChange={() => {}} />);
        const elem = screen.getByPlaceholderText(/search bar/i);
        expect(elem).toBeInTheDocument();
    });

    test("calls onChange function when input changes", () => {
        const handleChange = jest.fn();
        render(<SearchBar placeholder="Search bar" onChange={handleChange} />);
        const inputElement = screen.getByPlaceholderText(/search bar/i);

        fireEvent.change(inputElement, { target: { value: "test" } });
        expect(handleChange).toHaveBeenCalled();
    });
});
