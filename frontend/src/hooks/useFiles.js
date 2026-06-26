import { useEffect, useState } from "react";
import { getFiles } from "../api/fileApi";

function useFiles(parentId) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFiles = async () => {
    try {
      setLoading(true);

      const response = await getFiles(parentId);

      setFiles(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [parentId]);

  return {
    files,
    loading,
    fetchFiles,
  };
}

export default useFiles;