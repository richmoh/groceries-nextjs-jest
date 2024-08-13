"use client";

import Item from "./Item";
import AddItem from "./AddItem";
import { CSSProperties } from "react";

export type GroceryListType = {
  id: number,
  name: string,
  items: any[]
}

const styles: { [key: string]: CSSProperties } = {
  groceryList: {
    display: "flex",
    flexDirection: "column",
    margin: "10px",
    border: "1px solid #d5d5d5",
    borderRadius: "5px",
    padding: "25px"
  },
  heading: {
    marginBottom: "1px"
  },
  listContainer: {
    marginTop: "10px",
    marginBottom: "10px",
  }
};

type GroceryListProps = {
  list: GroceryListType,
  onItemsUpdated: (name: string) => void
}

export default function GroceryList({ list, onItemsUpdated }: GroceryListProps) {
  return (
    <div style={styles.groceryList}>
      <h2 style={styles.heading}>{list.name}</h2>      
      <div style={styles.listContainer}>
        {list.items?.map((item) => (
          <Item key={item.id} item={item} onItemsUpdated={onItemsUpdated} groceryListId={list.id} />
        ))}
      </div>
      <AddItem groceryListId={list.id} onItemsUpdated={onItemsUpdated} />
    </div>
  );
}
