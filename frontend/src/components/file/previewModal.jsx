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
      flex
      items-center
      justify-center
      z-50
      p-6
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
        rounded-2xl
        w-full
        max-w-7xl
        h-[90vh]
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
          px-6
          "
        >
          <h2
            className="
            text-white
            font-semibold
            text-lg
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

        {/* Preview Area */}
        <div
          className="
          flex-1
          flex
          items-center
          justify-center
          overflow-auto
          p-6
          "
        >
          {file.content}
        </div>
      </div>
    </div>
  );
}

export default PreviewModal;