export const getFileName = (fileUri: string): string => {
  // console.log(fileUri);
  return fileUri.split("///")[1].split("/")[6];
};

export const getFileTypeHeader = (fileName: string): string => {
  const fileExtension: string = fileName.split(".")[1];

  if (fileExtension === "jpg") return "image/jpg";
  if (fileExtension === "webp") return "image/webp";
  return "application/pdf";
};
