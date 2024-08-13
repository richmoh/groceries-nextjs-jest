"use client";

export type Item = {
  id: number,
  name: string,
  isPurchased: boolean 
}

type ItemProps = {
  item: Item,
  groceryListId: number,
  onItemsUpdated: (name: string) => void
}

export default function Item({ groceryListId, item, onItemsUpdated }: ItemProps) {

  async function onItemCheckboxClicked(e: React.ChangeEvent<HTMLInputElement>) {
    await fetch(`/api/grocerylists/${groceryListId}/item/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ isPurchased: e.target.checked })
    });

    onItemsUpdated(item.name);
  }

  return (    
    <div role="listitem">
      <label>
        <input type="checkbox" checked={item.isPurchased} onChange={onItemCheckboxClicked} />
        <span className="item-name">{item.name}</span>
      </label>
    </div>    
  );
}
