function Toolbar() {
  return (
    <div className="flex justify-between mb-6">
      <h1 className="text-4xl font-bold">
        My Drive
      </h1>

      <button
        className="
        bg-slate-800
        hover:bg-slate-700
        px-5
        py-2
        rounded-lg
        "
      >
        + New Folder
      </button>
    </div>
  );
}

export default Toolbar;