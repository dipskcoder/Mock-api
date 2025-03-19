import React from "react";

interface ItemProps {
  item: {
    id: number;
    title: string;
    body: string;
  };
}

export const Item: React.FC<ItemProps> = ({ item }) => {
  return (
    <li className="p-4 border rounded-lg shadow-md">
      <h3 className="font-semibold text-lg">{item.title}</h3>
      <p>{item.body}</p>
    </li>
  );
};
