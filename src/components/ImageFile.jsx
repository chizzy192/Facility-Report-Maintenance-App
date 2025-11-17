import { Upload } from "lucide-react"
import { useState } from "react";

function ImageFile() {
    const [image, setImage] = useState("");
  return (
    <div>
        <p className="font-bold text-text mb-2">Upload Images (Optional)</p>
        <label
            for="input-file"
            id="drop-area"
            className="block w-full h-40 rounded-lg text-center cursor-pointer"
        >
            <input type="file" name="imageFileName" accept="image/*" id="input-file" hidden/>
            <div
            id="img-view"
            className="w-full h-full border-3 border-dashed border-border bg-gray-200 dark:bg-neutral-900 hover:border-primary-dark rounded-lg flex flex-col justify-center items-center gap-2 bg-center bg-cover "
            >
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
