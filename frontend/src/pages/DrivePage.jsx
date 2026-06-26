import { useState } from "react";
import Breadcrumbs from "../components/common/Breadcrumbs";
import Toolbar from "../components/common/Toolbar";
import FileTable from "../components/file/FileTable";
import FileRow from "../components/file/FileRow";
import FolderRow from "../components/folder/FolderRow";
import useFiles from "../hooks/useFiles";

function DrivePage() {
  const [currentFolderId, setCurrentFolderId] = useState(null);

  const { files, loading } = useFiles(currentFolderId);

  const [breadcrumbs, setBreadcrumbs] = useState([]);

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

  return (
    <>
      <Breadcrumbs
        breadcrumbs={breadcrumbs}
        onNavigate={handleNavigate}
      />
      <Toolbar />

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
              />
            );
          })}
        </FileTable>
      )}
    </>
  );
}

export default DrivePage;