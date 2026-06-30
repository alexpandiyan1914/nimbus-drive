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
  md:grid
  md:grid-cols-5
  border-b
  border-slate-900
  hover:bg-slate-900
  cursor-pointer
  p-4
  md:px-6
  md:py-4
  "
    >
      {/* Mobile */}
      <div className="md:hidden">
        <div className="flex justify-between">
          <div>
            <div className="font-medium">
              📄 {name}
            </div>

            <div className="text-sm text-slate-400">
              {size}
            </div>

            <div className="text-sm text-slate-400">
              {type}
            </div>
          </div>

          <RowActions
            onDownload={onDownload}
            onDelete={onDelete}
          />
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        📄 {name}
      </div>

      <div className="hidden md:block">
        {size}
      </div>

      <div className="hidden md:block">
        {type}
      </div>

      <div className="hidden md:block">
        {modified}
      </div>

      <div
        className="
    hidden
    md:flex
    justify-end
    "
      >
        <RowActions
          onDownload={onDownload}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}

export default FileRow;