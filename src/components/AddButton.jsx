export default function AddButton({ addItem }) {
  return (
    <button onClick={() => addItem()}>
      <span>Add</span>
    </button>
  );
}
