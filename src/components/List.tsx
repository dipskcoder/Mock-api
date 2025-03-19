import React from "react";
import { Item } from "./Item";

interface ItemType {
  id: number;
  title: string;
  body: string;
}

interface ListProps {
  items: ItemType[];
  onEditItem: (item: ItemType) => void;
  onDeleteItem: (id: number) => void;
}

const List: React.FC<ListProps> = ({ items, onEditItem, onDeleteItem }) => {
  return (
    <div className="max-w-2xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Items</h2>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id} className="p-4 border rounded-lg shadow-md">
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p>{item.body}</p>
            <div className="mt-2 flex space-x-4">
              <button
                onClick={() => onEditItem(item)}
                className="bg-yellow-500 text-white py-1 px-3 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => onDeleteItem(item.id)}
                className="bg-red-500 text-white py-1 px-3 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
