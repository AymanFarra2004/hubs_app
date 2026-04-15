import axios from "axios";

/**
 * Upload a file/FormData utilizing Axios to track upload progress.
 */
export const uploadWithProgress = async (
  url: string,
  formData: FormData,
  onProgress: (progress: number) => void
): Promise<any> => {
  try {
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentComplete = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          onProgress(percentComplete);
        }
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || error.response.data.error || `HTTP Error ${error.response.status}`);
    }
    throw new Error(error.message || "Network Error occurred during the upload");
  }
};
