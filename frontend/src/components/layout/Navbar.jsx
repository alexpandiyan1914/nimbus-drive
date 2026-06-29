import { searchFiles } from "../../api/fileApi";
import { useDrive } from "../../context/DriveContext";

function Navbar() {
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
        onChange={handleSearch}
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