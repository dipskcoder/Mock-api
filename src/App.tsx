import React, { useState, useEffect } from "react";
import List from "./components/List";
import AddItemForm from "./components/AddItemForm";
import { fetchItems, createItem, updateItem, deleteItem } from "./utils/api";
import Loader from "./components/Loader";

const App: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loader, setLoader] = useState<any>(false);
  const [loadingError, setLoadingError] = useState<any>(false);
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
      setLoadingError(true);
      setLoader(false);
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
      setItems([createdItem, ...items]); // Add the new item to the list
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
    window.scrollTo(0, 0)
  };

  // Handle updating an item
  const handleUpdateItem = async (updatedItem: {
    title: string;
    body: string;
  }) => {
    if (currentItem.id) {
      try {
        setLoader(true);
        const updated = await updateItem(currentItem.id, updatedItem);
        setLoader(false);
        setItems(
          items.map((item) => (item.id === currentItem.id ? updated : item))
        );
        setCurrentItem({ title: "", body: "" }); // Clear form after update
      } catch (error) {
        console.error("Error updating item:", error);
        setLoadingError(true);
        setLoader(false);
      }
    }
  };

  // Handle deleting an item
  const handleDeleteItem = async (id: number) => {
    try {
      setLoader(true);
      await deleteItem(id);
      setLoader(false);
      setItems(items.filter((item) => item.id !== id)); // Remove from list
    } catch (error) {
      console.error("Error deleting item:", error);
      setLoadingError(true);
      setLoader(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-6"> Mock API</h1>
      <AddItemForm
        onAddItem={handleAddItem}
        currentItem={currentItem}
        onUpdateItem={handleUpdateItem}
      />
      {loadingError && (
        <h2 className="text-red-500 text-2xl font-bold mb-4 text-center my-8">
          An error occurred. Please try again later.
        </h2>
      )}
      {items.length > 0 && <List
        items={items}
        onEditItem={handleEditItem}
        onDeleteItem={handleDeleteItem}
      />}
      {loader && <Loader />}
    </div>
  );
};

export default App;
