import { Button } from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:3001";

function getServerStatus() {
  return fetch(`${API_URL}/`).then((data) => data.status);
}

function uploadFilesToUpdate(files: Array<File>) {
  const data = new FormData();

  files.forEach((file) => data.append("data", file));

  return fetch(`${API_URL}/pdf/upload`, {
    method: "POST",
    body: data,
  });
}

function HomePage() {
  const [files, setFiles] = useState<Array<File>>([]);

  useEffect(() => {
    getServerStatus().then((statusCode) => {
      if (statusCode == 200) {
        alert("Connect to pdf-converter sever");
      } else {
        alert("Server is not working");
      }
    });
  }, []);

  function handleChange(files: any) {
    setFiles(files);
  }

  function handleSubmit(files: Array<File>) {
    uploadFilesToUpdate(files);
  }

  return (
    <div>
      <h1>Convert File to PDF</h1>
      <DropzoneArea onChange={handleChange} maxFileSize={1024 * 1024 * 1024} />
      <Button onClick={() => handleSubmit(files)}>Submit</Button>
    </div>
  );
}

export default HomePage;
