"use client";

import { useState } from "react";

type AddItemProps = {
  groceryListId: number,
  onItemsUpdated: (name: string) => void
}

export default function AddItem({ groceryListId, onItemsUpdated }: AddItemProps) {
  const [name, setName] = useState("");

  function updateName (event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function addItem(e: React.FormEvent<HTMLFormElement>) {
    fetch(`/api/grocerylists/${groceryListId}/item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name })
    }).then(() => {
      setName("");
      onItemsUpdated(name);
    });

    e.preventDefault();
  }

  return (
    <form onSubmit={addItem}>
      <input type="text" value={name} onChange={updateName}/>
      <button type="submit">Add</button>
    </form>
  );
}
