import { useState } from "react";

function CreateFolderModal({
  open,
  onClose,
  onCreate,
}) {
  const [folderName, setFolderName] =
    useState("");

  if (!open) return null;

  const handleSubmit = () => {
    if (!folderName.trim()) return;

    onCreate(folderName);

    setFolderName("");
  };

  return (
    <div
      className="
      fixed
      inset-0
      bg-black/50
      flex
      items-center
      justify-center
      "
    >
      <div
        className="
        bg-slate-900
        p-6
        rounded-xl
        w-96
        "
      >
        <h2 className="text-xl font-bold mb-4">
          Create Folder
        </h2>

        <input
          type="text"
          placeholder="Folder name"
          value={folderName}
          onChange={(e) =>
            setFolderName(e.target.value)
          }
          className="
          w-full
          p-3
          rounded-lg
          bg-slate-800
          mb-4
          "
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="
            px-4
            py-2
            bg-slate-700
            rounded-lg
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="
            px-4
            py-2
            bg-indigo-600
            rounded-lg
            "
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateFolderModal;