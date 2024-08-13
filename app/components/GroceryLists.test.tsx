/**
 * @jest-environment jsdom
 */
import { act, render, screen, waitFor } from "@testing-library/react";
import GroceryLists from "./GroceryLists";

global.fetch = jest.fn();

describe("GroceryLists Component", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it("Displays multiple grocery list components when data passed in", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue([
        {
          id: 1,
          name: "List 1",
          items: [
            { id: 1, name: "Item 1" },
            { id: 2, name: "Item 2" },
          ],
        },
        {
          id: 2,
          name: "List 2",
          items: [
            { id: 3, name: "Item 3" },
            { id: 4, name: "Item 4" },
          ],
        },
      ]),
    };

    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    act(() => {
      render(<GroceryLists />);
    });

    await waitFor(() => {
      expect(screen.getAllByRole("listitem")).toHaveLength(4);
    });
  });
});