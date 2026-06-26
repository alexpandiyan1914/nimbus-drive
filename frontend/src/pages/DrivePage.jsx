import Breadcrumbs from "../components/common/Breadcrumbs";
import Toolbar from "../components/common/Toolbar";
import FileTable from "../components/file/FileTable";
import FileRow from "../components/file/FileRow";
import FolderRow from "../components/folder/FolderRow";

function DrivePage() {
  return (
    <>
      <Breadcrumbs />

      <Toolbar />

      <FileTable>
        <FolderRow
          name="Documents"
          modified="May 20, 2026"
        />

        <FolderRow
          name="Projects"
          modified="May 18, 2026"
        />

        <FileRow
          name="Resume.pdf"
          size="2.4 MB"
          type="PDF"
          modified="May 20, 2026"
        />

        <FileRow
          name="Proposal.docx"
          size="1.2 MB"
          type="DOCX"
          modified="May 19, 2026"
        />
      </FileTable>
    </>
  );
}

export default DrivePage;