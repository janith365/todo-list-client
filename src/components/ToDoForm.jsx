import AddButton from "./AddButton";
import ItemInput from "./ItemInput";

export default function ToDoForm({ toDoItem, updateItem, addItem }) {
  return (
    <div className="form">
      <ItemInput toDoItem={toDoItem} updateItem={updateItem} />
      <AddButton addItem={addItem} />
    </div>
  );
}
