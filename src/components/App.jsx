import { useState, useEffect } from "react";
import Heading from "./Heading";
import ToDoItems from "./ToDoItems";
import ToDoForm from "./ToDoForm";
import axios from "axios";

export default function App() {
  const [items, setItems] = useState([]);
  const [toDoItem, setToDoItem] = useState("");

  useEffect(() => {
    getItems();
  }, []);

  async function getItems() {
    const response = await axios.get(process.env.REACT_APP_SERVER_URL);
    setItems(response.data.map((item) => item.name));
  }

  function updateItem(e) {
    const item = e.target.value;
    setToDoItem(item);
  }

  async function addItem() {
    const data = { itemName: toDoItem };
    try {
      const response = await axios.post(process.env.REACT_APP_SERVER_URL, data);
      console.log(response.data);
      if (response.status === 200) {
        setItems((prevItems) => [...prevItems, toDoItem]);
        setToDoItem("");
      }
    } catch (error) {
      console.log(error.response);
    }
  }

  async function deleteItem(itemName) {
    const config = { data: { itemName: itemName } };
    const response = await axios.delete(process.env.REACT_APP_SERVER_URL, config);
    if (response.status === 200) {
      setItems(items.filter((i) => i !== itemName));
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
