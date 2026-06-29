import api from "./axios";

export const getFiles = (parentId = null) => {
  if (parentId === null) {
    return api.get("/api/files");
  }

  return api.get(`/api/files?parentId=${parentId}`);
};

export const deleteFile = (id) => {
  return api.delete(`/api/files/${id}`);
};

export const searchFiles = (keyword) => {
  return api.get(`/api/files/search?keyword=${keyword}`);
};

export const downloadFile = (id) => {
  return api.get(`/api/files/download/${id}`, {
    responseType: "blob",
  });
};

export const createFolder = (data) => {
  return api.post("/api/folders", data);
};

export const uploadFile = (
  file,
  parentId
) => {
  const formData =
    new FormData();

  formData.append("file", file);

  const url =
    parentId === null
      ? "/api/files/upload"
      : `/api/files/upload?parentId=${parentId}`;

  return api.post(
    url,
    formData
  );
};

export const getPreviewUrl = (id) => {
  return `http://localhost:8080/api/files/preview/${id}`;
};