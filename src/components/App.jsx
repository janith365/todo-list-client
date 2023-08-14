import { useState, useEffect } from "react";
import Heading from "./Heading";
import ToDoItems from "./ToDoItems";
import ToDoForm from "./ToDoForm";
import axios from "axios";

export default function App() {
  const [items, setItems] = useState([]);
  const [toDoItem, setToDoItem] = useState("");
  useEffect(() => {
    async function getItems() {
      const response = await fetch(process.env.REACT_APP_SERVER_URL);
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
    const data = { itemName: toDoItem };
    const response = await axios.post(process.env.REACT_APP_SERVER_URL, data);
    if (response.status === 200) {
      setItems((prevItems) => [...prevItems, toDoItem]);
      setToDoItem("");
    }
  }

  async function deleteItem(id) {
    const config = { data: { itemName: id } };
    const response = await axios.delete(process.env.REACT_APP_SERVER_URL, config);
    if (response.status === 200) {
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
