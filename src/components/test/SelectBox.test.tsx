import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SelectBox from "../custom/InputBox/SelectBox";
import { ManagersList } from "../../pages/KAM/Manager.types";
import { LeadList } from "../../pages/Leads/Leads.types";

describe("TextBox Component", () => {
    const mockManagersList: Partial<ManagersList>[] = [
        { id: 1, mgr_name: "Manager One" },
        { id: 2, mgr_name: "Manager Two" },
    ];

    const mockLeadsList: Partial<LeadList>[] = [
        { id: 1, lead_name: "Lead One" },
        { id: 2, lead_name: "Lead Two" },
    ];
    test("renders the text box ", () => {
        render(
            <SelectBox
                label="Select Manager"
                value="select"
                defaultValue="Select a manager"
                listName="managers"
                list={mockManagersList}
                onChange={() => {}}
            />
        );

        const labelElement = screen.getByLabelText(/select manager/i);
        expect(labelElement).toBeInTheDocument();
    });

    test("displays the default value correctly", () => {
        render(
            <SelectBox
                label="Select Manager"
                value="select"
                defaultValue="Select a manager"
                listName="managers"
                list={mockManagersList}
                onChange={() => {}}
            />
        );

        const selectElement = screen.getByRole("combobox");
        expect(selectElement).toHaveValue("select");
    });

    test("renders options based on the managers list", () => {
        render(
            <SelectBox
                label="Select Manager"
                value="select"
                defaultValue="Select a manager"
                listName="managers"
                list={mockManagersList}
                onChange={() => {}}
            />
        );

        const optionElements = screen.getAllByRole("option");
        expect(optionElements).toHaveLength(mockManagersList.length + 1); // +1 for the default option
        expect(screen.getByText("Manager One")).toBeInTheDocument();
        expect(screen.getByText("Manager Two")).toBeInTheDocument();
    });

    test("renders options based on the leads list", () => {
        render(
            <SelectBox
                label="Select Lead"
                value="select"
                defaultValue="Select a lead"
                listName="leads"
                leads={mockLeadsList}
                onChange={() => {}}
            />
        );

        const optionElements = screen.getAllByRole("option");
        expect(optionElements).toHaveLength(mockLeadsList.length + 1); // +1 for the default option
        expect(screen.getByText("Lead One")).toBeInTheDocument();
        expect(screen.getByText("Lead Two")).toBeInTheDocument();
    });

    test("calls onChange handler when selecting an option", () => {
        const handleChange = jest.fn();
        render(
            <SelectBox
                label="Select Manager"
                value="select"
                defaultValue="Select a manager"
                listName="managers"
                list={mockManagersList}
                onChange={handleChange}
            />
        );

        const selectElement = screen.getByRole("combobox");
        fireEvent.change(selectElement, { target: { value: "1" } });

        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    test("renders with the correct value", () => {
        render(
            <SelectBox
                label="Select Manager"
                value="1"
                defaultValue="Select a manager"
                listName="managers"
                list={mockManagersList}
                onChange={() => {}}
            />
        );
    });

    test("snapshot select box", () => {
        const { asFragment } = render(
            <SelectBox
                label="Select Manager"
                value="1"
                defaultValue="Select a manager"
                listName="managers"
                list={mockManagersList}
                onChange={() => {}}
            />
        );

        expect(asFragment).toMatchSnapshot();
    });
});
