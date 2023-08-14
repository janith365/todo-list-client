export default function ItemInput({ toDoItem, updateItem }) {
  return <input type="text" onChange={updateItem} value={toDoItem} />;
}
