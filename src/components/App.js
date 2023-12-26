import { useState, useEffect } from "react";
import Logo from "./Logo.js";
import Form from "./Form.js";
import PackingList from "./PackingList.js";
import Stats from "./Stats.js";

export default function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Retrieve items from local storage when the component mounts
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    setItems(storedItems);
  }, []); // Empty dependency array ensures this runs only once on mount

  function updateLocalStorage(items) {
    // Update local storage whenever items change
    localStorage.setItem("items", JSON.stringify(items));
  }

  function handleAddItems(item) {
    setItems((prevItems) => {
      const newItems = [...prevItems, item];
      updateLocalStorage(newItems);
      return newItems;
    });
  }

  function handleDeleteItem(id) {
    setItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.id !== id);
      updateLocalStorage(newItems);
      return newItems;
    });
  }

  function handleToggleItem(id) {
    setItems((prevItems) => {
      const newItems = prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      );
      updateLocalStorage(newItems);
      return newItems;
    });
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (confirmed) {
      setItems([]);
      updateLocalStorage([]);
    }
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItems={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
