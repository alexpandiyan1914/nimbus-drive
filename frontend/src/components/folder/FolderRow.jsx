function FolderRow({
  name,
  modified,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className="
      grid
      grid-cols-4
      px-6
      py-4
      border-b
      border-slate-900
      hover:bg-slate-900
      cursor-pointer
      "
    >
      <div>📁 {name}</div>

      <div>—</div>

      <div>Folder</div>

      <div>{modified}</div>
    </div>
  );
}

export default FolderRow;