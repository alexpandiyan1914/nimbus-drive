import { HiMenu } from "react-icons/hi";
import { searchFiles } from "../../api/fileApi";
import { useDrive } from "../../context/DriveContext";

function Navbar({
  setSidebarOpen,
}) {
  const {
    setSearchKeyword,
    setSearchResults,
  } = useDrive();

  const handleSearch = async (e) => {
    const keyword = e.target.value;

    setSearchKeyword(keyword);

    if (!keyword.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const response =
        await searchFiles(keyword);

      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header
      className="
      border-b
      border-slate-800
      bg-slate-950
      px-4
      py-3
      "
    >
      {/* Top Row */}
      <div
        className="
        flex
        items-center
        justify-between
        gap-4
        "
      >
        {/* Left Side */}
        <div
          className="
          flex
          items-center
          gap-3
          "
        >
          <button
            onClick={() =>
              setSidebarOpen(true)
            }
            className="
            md:hidden
            text-3xl
            text-slate-300
            "
          >
            <HiMenu />
          </button>

          <h1
            className="
            text-xl
            md:text-2xl
            font-bold
            text-indigo-500
            "
          >
            NimbusDrive
          </h1>
        </div>

        {/* Desktop Search */}
        <input
          type="text"
          placeholder="Search files and folders..."
          onChange={handleSearch}
          className="
          hidden
          md:block
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
      </div>

      {/* Mobile Search */}
      <input
        type="text"
        placeholder="Search files and folders..."
        onChange={handleSearch}
        className="
        md:hidden
        mt-4
        w-full
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