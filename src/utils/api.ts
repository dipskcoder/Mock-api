const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchItems = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch items");
  return response.json();
};

export const createItem = async (item: { title: string; body: string }) => {
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Failed to create item");
  return response.json();
};

export const updateItem = async (id: number, item: { title: string; body: string }) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Failed to update item");
  return response.json();
};

export const deleteItem = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete item");
  return id;
};
