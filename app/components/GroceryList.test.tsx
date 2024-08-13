/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import GroceryList from "./GroceryList";

it("Displays the list name", () => {
  const list = { 
    id: 1, 
    name: "List 1", 
    items: [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ] 
  }

  const onItemsUpdated = jest.fn();

  render(<GroceryList list={list} onItemsUpdated={onItemsUpdated}/>);
  expect(screen.getByRole('heading')).toHaveTextContent("List 1");
});

it("Displays multiple items", () => {
  const list = { 
    id: 1, 
    name: "List 1", 
    items: [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
      { id: 3, name: "Item 3" },
      { id: 4, name: "Item 4" },
    ] 
  }

  const onItemsUpdated = jest.fn();

  render(<GroceryList list={list} onItemsUpdated={onItemsUpdated} />);
  expect(screen.getAllByRole("listitem")).toHaveLength(4);
});