import Item from "./Item";

export default function ToDoItems({ items, deleteItem }) {
  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <Item key={index} id={item} item={item} deleteItem={deleteItem} />
        ))}
      </ul>
    </div>
  );
}
