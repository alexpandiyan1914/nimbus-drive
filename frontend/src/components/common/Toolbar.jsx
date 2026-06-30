function Toolbar({
  onNewFolder,
}) {
  return (
    <div
      className="
      flex
      flex-col
      gap-4
      md:flex-row
      md:justify-between
      md:items-center
      mb-6
      "
    >
      <h1
        className="
        text-2xl
        md:text-4xl
        font-bold
        break-words
        "
      >
        My Drive
      </h1>

      <button
        onClick={onNewFolder}
        className="
        w-full
        md:w-auto
        px-4
        py-2
        bg-slate-800
        rounded-lg
        hover:bg-slate-700
        transition
        "
      >
        + New Folder
      </button>
    </div>
  );
}

export default Toolbar;