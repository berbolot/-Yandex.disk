import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';

const YandexDiskUploader = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileDrop = (acceptedFiles) => {
    setSelectedFiles(acceptedFiles);
  };

  const handleFileUpload = () => {
    const API_KEY = 'YOUR_YANDEX_DISK_API_KEY';
    const UPLOAD_URL = 'https://cloud-api.yandex.net/v1/disk/resources/upload';

    const uploadPromises = selectedFiles.map((file) => {
      const formData = new FormData();
      formData.append('file', file);

      return axios.post(UPLOAD_URL, formData, {
        headers: {
          Authorization: `OAuth ${API_KEY}`,
        },
      });
    });

    Promise.all(uploadPromises)
      .then((responses) => {
        console.log('Files uploaded successfully!');
        console.log(responses);
      })
      .catch((error) => {
        console.error('Error uploading files:', error);
      });
  };

  return (
    <div>
      <Dropzone onDrop={handleFileDrop} accept="image/*" multiple={true} maxSize={5242880}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag and drop files here or click to select files (up to 100 images, max 5MB each).</p>
            <ul>
              {selectedFiles.map((file) => (
                <li key={file.name}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </Dropzone>
      <button onClick={handleFileUpload} disabled={selectedFiles.length === 0}>
        Upload Files
      </button>
    </div>
  );
};

export default YandexDiskUploader;
