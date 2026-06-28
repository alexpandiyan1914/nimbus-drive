import { useState, useRef, useEffect } from "react";

function RowActions({
  onDelete,
}) {
  const [open, setOpen] =
    useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div
      className="relative"
      ref={menuRef}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="
        px-2
        py-1
        rounded
        hover:bg-slate-800
        "
      >
        ⋮
      </button>

      {open && (
        <div
          className="
          absolute
          top-3
          right-4
          mt-0
          w-36
          bg-slate-900
          border
          border-slate-700
          rounded-lg
          shadow-lg
          z-50
          "
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
              setOpen(false);
            }}
            className="
            w-full
            text-left
            px-4
            py-2
            hover:bg-slate-800
            text-red-400
            "
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default RowActions;