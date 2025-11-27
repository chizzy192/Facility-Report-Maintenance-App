import { Upload } from "lucide-react"
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function ImageFile() {
  const [dataURL, setDataURL] = useState(null);
  const [uploadedURL, setUploadedURL] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onabort =  () => console.log("file reading was aborted");
      reader.onerror =  () => console.log("file reading has an error");
      reader.onload = () => {
        const binaryStr = reader.result
        setDataURL(binaryStr)
      }
      reader.readAsDataURL(file)
    });
  }, []);

  const {
    getRootProps,
    acceptedFiles,
    getInputProps,
    isDragActive
  } = useDropzone({ onDrop });

  const selectedFile = acceptedFiles[0];
  console.log(selectedFile);
  return (
    <div>
        <p className="font-bold text-text mb-2">Upload Images (Optional)</p>
        <label
            for="input-file"
            id="drop-area"
            className="block w-full h-40 rounded-lg text-center cursor-pointer"
        >        
            <div
              id="img-view"
              className="w-full h-full border-3 border-dashed border-border bg-gray-200 dark:bg-neutral-900 hover:border-primary-dark rounded-lg flex flex-col justify-center items-center gap-2 bg-center bg-cover " 
              {...getRootProps()}
          
            >
              <input 
                type="file" 
                name="imageFileName" 
                accept="image/*" 
                hidden
                {...getInputProps()}
              />
              <Upload color="rgb(107, 114, 128)" />
            <p className="text-text-muted text-sm">
              Drag and drop your image here, or click to upload<br />
              <span className="text-text-muted">Supports JPG, PNG files</span>
            </p>
            </div>
        </label>
    </div>
  )
}

export default ImageFile
