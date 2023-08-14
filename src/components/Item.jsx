export default function Item({ id, item, deleteItem }) {
  return (
    <li id={id} onClick={() => deleteItem(item)}>
      {item}
    </li>
  );
}
