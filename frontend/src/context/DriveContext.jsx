import { createContext, useContext, useState } from "react";

const DriveContext = createContext();

export function DriveProvider({ children }) {
  const [currentFolderId, setCurrentFolderId] =
    useState(null);

  const [refreshTrigger, setRefreshTrigger] =
    useState(0);

  const [searchKeyword, setSearchKeyword] =
    useState("");

  const [searchResults, setSearchResults] =
    useState([]);

  const refreshFiles = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <DriveContext.Provider
      value={{
        currentFolderId,
        setCurrentFolderId,
        refreshTrigger,
        refreshFiles,
        searchKeyword,
        setSearchKeyword,
        searchResults,
        setSearchResults,
      }}
    >
      {children}
    </DriveContext.Provider>
  );
}

export function useDrive() {
  return useContext(DriveContext);
}