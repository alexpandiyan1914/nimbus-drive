import { HiX } from "react-icons/hi";

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {
  return (
    <aside
      className={`
        fixed
        top-16
        left-0
        h-[calc(100vh-64px)]
        w-64
        bg-slate-950
        border-r
        border-slate-800
        p-4
        z-40
        transform
        transition-transform
        duration-300

        md:relative
        md:top-0
        md:h-full
        md:translate-x-0

        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }
      `}
    >
      {/* Mobile Close Button */}
      <div className="flex justify-end md:hidden mb-4">
        <button
          onClick={() =>
            setSidebarOpen(false)
          }
          className="
            text-3xl
            text-slate-400
            hover:text-white
          "
        >
          <HiX />
        </button>
      </div>

      {/* Upload Button */}
      <button
        className="
          w-full
          bg-indigo-600
          hover:bg-indigo-700
          transition
          py-3
          rounded-xl
          text-white
          font-medium
          mb-6
        "
      >
        + Upload
      </button>

      {/* Navigation */}
      <nav className="space-y-3">
        <button
          className="
            w-full
            text-left
            p-3
            rounded-xl
            bg-slate-900
            hover:bg-slate-800
            transition
          "
        >
          My Drive
        </button>

        <button
          className="
            w-full
            text-left
            p-3
            rounded-xl
            text-slate-400
            hover:bg-slate-900
            hover:text-white
            transition
          "
        >
          Recent
        </button>

        <button
          className="
            w-full
            text-left
            p-3
            rounded-xl
            text-slate-400
            hover:bg-slate-900
            hover:text-white
            transition
          "
        >
          Favorites
        </button>

        <button
          className="
            w-full
            text-left
            p-3
            rounded-xl
            text-slate-400
            hover:bg-slate-900
            hover:text-white
            transition
          "
        >
          Trash
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;