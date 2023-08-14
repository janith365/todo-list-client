import { useState, useEffect } from "react";
import Heading from "./Heading";
import ToDoItems from "./ToDoItems";
import ToDoForm from "./ToDoForm";

export default function App() {
  const [items, setItems] = useState([]);
  const [toDoItem, setToDoItem] = useState("");
  useEffect(() => {
    async function getItems() {
      const response = await fetch(`http://localhost:5000/`);
      const jsonResponse = await response.json();
      setItems(jsonResponse.map((item) => item.name));
    }
    getItems();
  }, []);

  function updateItem(e) {
    const item = e.target.value;
    setToDoItem(item);
  }

  async function addItem() {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemName: toDoItem })
    };
    const response = await fetch("http://localhost:5000/", options);
    if (response.ok) {
      setItems((prevItems) => [...prevItems, toDoItem]);
      setToDoItem("");
    }
  }

  async function deleteItem(id) {
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemName: id })
    };
    const response = await fetch("http://localhost:5000/", options);
    if (response.ok) {
      setItems(items.filter((i) => i !== id));
    }
  }

  return (
    <div className="container">
      <Heading />
      <ToDoForm toDoItem={toDoItem} updateItem={updateItem} addItem={addItem} />
      <ToDoItems items={items} deleteItem={deleteItem} />
    </div>
  );
}
