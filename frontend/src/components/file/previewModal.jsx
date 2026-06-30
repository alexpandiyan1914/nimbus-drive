import { useEffect } from "react";

function PreviewModal({
  open,
  onClose,
  file,
}) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleEsc
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEsc
      );
    };
  }, [onClose]);

  if (!open || !file) {
    return null;
  }

  return (
    <div
      className="
      fixed
      inset-0
      bg-black/80
      backdrop-blur-sm
      z-50
      md:flex
      md:items-center
      md:justify-center
      md:p-6
      "
      onClick={onClose}
    >
      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        className="
        bg-slate-950
        border
        border-slate-800
        w-full
        h-full
        md:max-w-7xl
        md:h-[90vh]
        md:rounded-2xl
        overflow-hidden
        flex
        flex-col
        shadow-2xl
        "
      >
        {/* Header */}
        <div
          className="
          h-16
          border-b
          border-slate-800
          flex
          items-center
          justify-between
          px-4
          md:px-6
          shrink-0
          "
        >
          <h2
            className="
            text-white
            font-semibold
            text-base
            md:text-lg
            truncate
            "
          >
            {file.name}
          </h2>

          <button
            onClick={onClose}
            className="
            text-slate-400
            hover:text-white
            text-3xl
            transition
            "
          >
            ✕
          </button>
        </div>

        {/* Preview */}
        <div
          className="
          flex-1
          flex
          items-center
          justify-center
          overflow-auto
          p-3
          md:p-6
          "
        >
          {file.content}
        </div>
      </div>
    </div>
  );
}

export default PreviewModal;