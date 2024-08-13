/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Item from "./Item";

describe("Item Component", () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("Displays an item with a checkbox and a name", () => {
        const item = { id: 1, name: "Item 1", isPurchased: false };
        const onItemsUpdated = jest.fn();
        
        render(<Item item={item} groceryListId={1} onItemsUpdated={onItemsUpdated} />);
        expect(screen.getByRole("checkbox")).toBeInTheDocument();
        expect(screen.getByText("Item 1")).toBeInTheDocument();
    });

    it("Tapping on the checkbox calls onItemsUpdated", async () => {
        const item = { id: 1, name: "Item 1", isPurchased: false };
        const onItemsUpdated = jest.fn();
        
        render(<Item item={item} groceryListId={1} onItemsUpdated={onItemsUpdated} />);
        fireEvent.click(screen.getByRole("checkbox"));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
            expect(onItemsUpdated).toHaveBeenCalledTimes(1);
        });
    });

    it("Checkbox displays checked when isPurchased is true", async () => {
        const item = { id: 1, name: "Item 1", isPurchased: true };
        const onItemsUpdated = jest.fn();
        
        render(<Item item={item} groceryListId={1} onItemsUpdated={onItemsUpdated} />);

        expect(screen.getByRole("checkbox")).toBeChecked();
    });
});