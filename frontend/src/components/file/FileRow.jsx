function FileRow({
  name,
  size,
  type,
  modified,
}) {
  return (
    <div
      className="
      grid
      grid-cols-4
      px-6
      py-4
      border-b
      border-slate-900
      hover:bg-slate-900
      "
    >
      <div>📄 {name}</div>

      <div>{size}</div>

      <div>{type}</div>

      <div>{modified}</div>
    </div>
  );
}

export default FileRow;