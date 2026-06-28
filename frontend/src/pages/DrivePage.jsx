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

function DrivePage() {
  const {
    currentFolderId,
    setCurrentFolderId,
    refreshTrigger,
  } = useDrive();

  const {
    files,
    loading,
    fetchFiles,
  } = useFiles(
    currentFolderId,
    refreshTrigger
  );


  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const [showModal, setShowModal] = useState(false);

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


      {loading ? (
        <p className="text-slate-400">
          Loading...
        </p>
      ) : (
        <FileTable>
          {files.map((item) => {
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
              />
            );
          })}
        </FileTable>
      )}
    </>
  );
}

export default DrivePage;