function Navbar() {
  return (
    <header
      className="
      h-16
      border-b
      border-slate-800
      bg-slate-950
      flex
      items-center
      justify-between
      px-6
      "
    >
      <h1 className="text-2xl font-bold text-indigo-500">
        NimbusDrive
      </h1>

      <input
        type="text"
        placeholder="Search files and folders..."
        className="
          w-96
          bg-slate-900
          border
          border-slate-700
          rounded-lg
          px-4
          py-2
          text-white
          outline-none
        "
      />
    </header>
  );
}

export default Navbar;