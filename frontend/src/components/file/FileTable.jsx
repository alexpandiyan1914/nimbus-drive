function FileTable({ children }) {
  return (
    <div
      className="
      border
      border-slate-800
      rounded-xl
      overflow-hidden
      "
    >
      <div
        className="
        grid
        grid-cols-5
        px-6
        py-3
        border-b
        border-slate-800
        text-slate-400
        "
      >
        <div>Name</div>
        <div>Size</div>
        <div>Type</div>
        <div>Modified</div>
        <div className="text-right">
          Actions
        </div>
      </div>

      {children}
    </div>
  );
}

export default FileTable;