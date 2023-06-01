import { useEffect } from 'react';
import { Typography, IconButton } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploadProps {
  onFilesChange: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFilesChange }) => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg'],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  // Call the onFilesChange callback when files change
  useEffect(() => {
    onFilesChange(files);
  }, [files, onFilesChange]);

  return (
    <div
      {...getRootProps()}
      style={{
        border: '1px dashed gray',
        padding: '20px',
        marginBottom: '20px',
      }}
    >
      <input {...getInputProps()} />
      <Typography>Drop images here or click to browse</Typography>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {files.map((file, index) => (
          <div
            key={file.name}
            style={{
              margin: '10px',
              position: 'relative',
              backgroundColor: 'grey',
            }}
          >
            <IconButton
              size='small'
              onClick={() => removeFile(index)}
              style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
              }}
            >
              <DeleteOutline />
            </IconButton>
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              style={{ width: '100px', height: '100px' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
