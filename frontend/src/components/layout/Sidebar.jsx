function Sidebar() {
  return (
    <aside
      className="
      w-64
      bg-slate-950
      border-r
      border-slate-800
      p-4
      "
    >
      <button
        className="
        w-full
        bg-indigo-600
        hover:bg-indigo-700
        py-3
        rounded-lg
        text-white
        mb-6
        "
      >
        + Upload
      </button>

      <nav className="space-y-2">
        <div className="p-3 rounded-lg bg-slate-900 text-white">
          My Drive
        </div>

        <div className="p-3 rounded-lg text-slate-400">
          Recent
        </div>

        <div className="p-3 rounded-lg text-slate-400">
          Favorites
        </div>

        <div className="p-3 rounded-lg text-slate-400">
          Trash
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;