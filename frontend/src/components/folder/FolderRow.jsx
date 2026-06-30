import RowActions from "../common/RowActions";

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
      cursor-pointer
      border-b
      border-slate-900
      hover:bg-slate-900
      transition
      "
    >
      {/* Desktop */}
      <div
        className="
        hidden
        md:grid
        md:grid-cols-5
        px-6
        py-4
        items-center
        "
      >
        <div className="truncate">
          📁 {name}
        </div>

        <div>—</div>

        <div>Folder</div>

        <div>{modified}</div>

        <div className="flex justify-end">
          <RowActions
            onDelete={onDelete}
          />
        </div>
      </div>

      {/* Mobile */}
      <div
        className="
        md:hidden
        p-4
        flex
        justify-between
        items-start
        "
      >
        <div className="min-w-0">
          <p
            className="
            font-medium
            truncate
            "
          >
            📁 {name}
          </p>

          <p
            className="
            text-sm
            text-slate-400
            mt-1
            "
          >
            Folder
          </p>
        </div>

        <RowActions
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}

export default FolderRow;