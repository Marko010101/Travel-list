export default function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚵</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed === true).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className={percentage === 100 ? "stats done" : "stats"}>
      {percentage === 100 ? (
        <em>You got everything! Ready to go 👋 ✈️</em>
      ) : (
        <em>
          💼 You have {numItems} items on your list, and you already packed{" "}
          {numPacked} ({!isNaN(percentage) ? percentage : 0}%)
        </em>
      )}
    </footer>
  );
}
