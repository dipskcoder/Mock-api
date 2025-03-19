import React, { useState, useEffect } from "react";

interface AddItemFormProps {
  onAddItem: (newItem: { title: string; body: string }) => void;
  onUpdateItem: (updatedItem: { title: string; body: string }) => void;
  currentItem: { id?: number; title: string; body: string };
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onAddItem, onUpdateItem, currentItem }) => {
  const [title, setTitle] = useState(currentItem.title || "");
  const [body, setBody] = useState(currentItem.body || "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTitle(currentItem.title || "");
    setBody(currentItem.body || "");
  }, [currentItem]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title && !body) {
      setError("Title and description are required!");
      return;
    }
    if (!title) {
      setError("Title is required!");
      return;
    }
    if (!body) {
      setError("Description is required!");
      return;
    }

    if (currentItem.id) {
      // If currentItem has an id, we are updating the item
      await onUpdateItem({ title, body });
    } else {
      // If no id, it's a new item
      await onAddItem({ title, body });
    }

    setError(null);
  };


  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">{currentItem.id ? "Edit Item" : "Add Item"}</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="Description"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white rounded-lg"
      >
        {currentItem.id ? "Update" : "Add"}
      </button>
    </form>
  )
 
  }
  export default AddItemForm