import React, { useState, useEffect } from "react";
import List from "./components/List";
import AddItemForm from "./components/AddItemForm";
import { fetchItems, createItem, updateItem, deleteItem } from "./utils/api";

const App: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loader, setLoader] = useState<any>(false);
  const [currentItem, setCurrentItem] = useState<{
    id?: number;
    title: string;
    body: string;
  }>({
    title: "",
    body: "",
  });


  // Fetch the list of items initially
  const loadItems = async () => {
    try {
      setLoader(true);
      const data = await fetchItems();
      setLoader(false);
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  // Handle adding a new item
  const handleAddItem = async (newItem: { title: string; body: string }) => {
    try {
      setLoader(true);
      const createdItem = await createItem(newItem);
      setLoader(false);
      setItems([createdItem,...items]); // Add the new item to the list
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  // Handle editing an item
  const handleEditItem = (item: {
    id: number;
    title: string;
    body: string;
  }) => {
    setCurrentItem(item);
  };

  // Handle updating an item
  const handleUpdateItem = async (updatedItem: {
    title: string;
    body: string;
  }) => {
    if (currentItem.id) {
      try {
        const updated = await updateItem(currentItem.id, updatedItem);
        setItems(
          items.map((item) => (item.id === currentItem.id ? updated : item))
        );
        setCurrentItem({ title: "", body: "" }); // Clear form after update
      } catch (error) {
        console.error("Error updating item:", error);
      }
    }
  };

  // Handle deleting an item
  const handleDeleteItem = async (id: number) => {
    try {
      await deleteItem(id);
      setItems(items.filter((item) => item.id !== id)); // Remove from list
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-6"> Mock API 

      </h1>
      <AddItemForm
        onAddItem={handleAddItem}
        currentItem={currentItem}
        onUpdateItem={handleUpdateItem}
      />
      <List
        items={items}
        onEditItem={handleEditItem}
        onDeleteItem={handleDeleteItem}
      />
      {loader && <div className="flex justify-center items-center h-screen fixed top-0 left-0 right-0 bottom-0 w-full z-50 overflow-hidden bg-gray-700 opacity-75">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>}
    </div>
  );
};

export default App;
