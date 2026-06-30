import RowActions
  from "../common/RowActions";

function FileRow({
  name,
  size,
  type,
  modified,
  onDelete,
  onDownload,
  onPreview
}) {
  return (
    <div
      onClick={onPreview}
      className="
      grid
      grid-cols-5
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

      <div className="flex justify-end">
        <RowActions
          onDownload={onDownload}
          onDelete={onDelete}
        />
      </div>

      
    </div>
  );
}

export default FileRow;