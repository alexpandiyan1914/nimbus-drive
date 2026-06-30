import { useState } from "react";
import Breadcrumbs from "../components/common/Breadcrumbs";
import Toolbar from "../components/common/Toolbar";
import FileTable from "../components/file/FileTable";
import FileRow from "../components/file/FileRow";
import FolderRow from "../components/folder/FolderRow";
import useFiles from "../hooks/useFiles";
import CreateFolderModal from "../components/folder/CreateFolderModal";
import { createFolder } from "../api/fileApi";
import { useDrive } from "../context/DriveContext";
import { deleteFile } from "../api/fileApi";
import { searchFiles } from "../api/fileApi";
import { getPreviewUrl } from "../api/fileApi";
import PreviewModal from "../components/file/previewModal";
import { getDownloadUrl } from "../api/fileApi";

function DrivePage() {
  const {
    currentFolderId,
    setCurrentFolderId,
    refreshTrigger,
    searchKeyword,
    searchResults
  } = useDrive();

  const {
    files,
    loading,
    fetchFiles,
  } = useFiles(
    currentFolderId,
    refreshTrigger
  );

  const displayFiles = searchKeyword.trim() ? searchResults : files;

  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [previewOpen, setPreviewOpen] = useState(false);

  const [previewFile, setPreviewFile] = useState(null);

  const handleNavigate = (folderId) => {
    setCurrentFolderId(folderId);

    if (folderId === null) {
      setBreadcrumbs([]);
      return;
    }

    const index =
      breadcrumbs.findIndex(
        (b) => b.id === folderId
      );

    setBreadcrumbs(
      breadcrumbs.slice(0, index + 1)
    );
  };

  const handleCreateFolder =
    async (folderName) => {
      try {
        await createFolder({
          name: folderName,
          parentId: currentFolderId,
        });

        setShowModal(false);

        fetchFiles();
      } catch (error) {
        console.error(error);
      }
    };

  const handleDelete =
    async (id, name) => {
      const confirmed =
        window.confirm(
          `Delete "${name}" ?`
        );

      if (!confirmed) return;

      try {
        await deleteFile(id);

        fetchFiles();
      } catch (error) {
        console.error(error);
      }
    };

  const handlePreview = (item) => {
    const url = getPreviewUrl(item.id);

    const extension = item.name
      .split(".")
      .pop()
      .toLowerCase();

    // Images
    if (
      [
        "png",
        "jpg",
        "jpeg",
        "gif",
        "webp",
        "svg",
      ].includes(extension)
    ) {
      setPreviewFile({
        name: item.name,
        content: (
          <img
            src={url}
            alt={item.name}
            className="
            max-h-full
            max-w-full
            object-contain
            rounded-lg
            shadow-2xl
          "
          />
        ),
      });

      setPreviewOpen(true);
      return;
    }

    // PDF
    if (extension === "pdf") {
      setPreviewFile({
        name: item.name,
        content: (
          <iframe
            src={url}
            title={item.name}
            className="
            w-full
            h-full
            rounded-lg
            bg-white
          "
          />
        ),
      });

      setPreviewOpen(true);
      return;
    }

    alert(
      "Preview is not available for this file type."
    );
  };

  const handleDownload = (id) => {
    window.open(
      getDownloadUrl(id),
      "_blank"
    );
  };

  return (
    <>
      <Breadcrumbs
        breadcrumbs={breadcrumbs}
        onNavigate={handleNavigate}
      />

      <CreateFolderModal
        open={showModal}
        onClose={() =>
          setShowModal(false)
        }
        onCreate={handleCreateFolder}
      />

      <Toolbar
        onNewFolder={() =>
          setShowModal(true)
        }
      />

      {searchKeyword &&
        displayFiles.length === 0 && (
          <p className="text-slate-400">
            No files found.
          </p>
        )}


      {loading ? (
        <p className="text-slate-400">
          Loading...
        </p>
      ) : (
        <FileTable>
          {displayFiles.map((item) => {
            if (item.folder) {
              return (
                <FolderRow
                  key={item.id}
                  name={item.name}
                  modified="-"
                  onClick={() => {
                    setCurrentFolderId(item.id);

                    setBreadcrumbs((prev) => [
                      ...prev,
                      {
                        id: item.id,
                        name: item.name,
                      },
                    ]);
                  }}
                  onDelete={() =>
                    handleDelete(
                      item.id,
                      item.name
                    )
                  }
                />
              );
            }

            return (
              <FileRow
                key={item.id}
                name={item.name}
                size={item.size}
                type="File"
                modified="-"
                onDelete={() =>
                  handleDelete(
                    item.id,
                    item.name
                  )
                }
                onPreview={() =>
                  handlePreview(item)
                }
                onDownload={() =>
                  handleDownload(item.id)
                }
              />
            );
          })}
        </FileTable>
      )}

      <button
        onClick={() =>
          setShowModal(true)
        }
        className="
  md:hidden
  fixed
  bottom-6
  right-6
  w-14
  h-14
  rounded-full
  bg-indigo-600
  text-3xl
  shadow-xl
  z-20
  flex
  items-center
  justify-center
  hover:bg-indigo-700
  "
      >
        +
      </button>

      <PreviewModal
        open={previewOpen}
        onClose={() =>
          setPreviewOpen(false)
        }
        file={previewFile}
      />
    </>
  );
}

export default DrivePage;