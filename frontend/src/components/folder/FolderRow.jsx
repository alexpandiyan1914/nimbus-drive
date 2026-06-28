import RowActions
  from "../common/RowActions";

function FolderRow({
  name,
  modified,
  onClick,
  onDelete,
}) {
  return (

    <div
      onClick={onClick}
      className="
      grid
      grid-cols-5
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

      <div className="flex justify-end">
        <RowActions
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}

export default FolderRow;