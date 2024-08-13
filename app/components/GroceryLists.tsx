"use client";

import { useState, useEffect } from "react";
import GroceryList, { GroceryListType } from "./GroceryList";
import { CSSProperties } from 'react';

export default function GroceryLists() {
  const [lists, setLists] = useState<GroceryListType[]>([]);

  const styles: { [key: string]: CSSProperties } = {
    groceryListContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    addListButton: {
      margin: "10px",
      padding: "10px",
      borderRadius: "100%",
      border: "1px solid #d5d5d5",
      textAlign: "center",
      position: "fixed",
      bottom: "20px",
      right: "20px",
      height: "80px",
      width: "80px",
      fontSize: "40px",
      backgroundColor: "#1795d4",
      color: "white"
    }
  };

  async function updateLists() {
    const response = await fetch("/api/grocerylists");
    const data = await response.json();
    setLists(data);
  }

  function generateListName() {
    return `List ${lists.length + 1}`;
  }

  async function addList() {
    await fetch("/api/grocerylists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: generateListName() })
    });
    updateLists();
  }

  useEffect(() => {
    updateLists();
  }, []);

  return (
    <>
      <h1>Grocery Lists</h1>      
      <div style={styles.groceryListContainer}>
        {lists?.map((list: GroceryListType) => (
          <GroceryList key={list.id} list={list} onItemsUpdated={updateLists} />
        ))}
      </div>
      <button onClick={addList} style={styles.addListButton}>+</button>
    </>
  );
}
