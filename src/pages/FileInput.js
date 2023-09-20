import React, { useState } from "react";
import { storage } from "./firebase";


function FileInput({ onFileUpload }) {
    const [image, setImage] = useState("");
   
    const upload = () => {
        if (image == null)
            return;
        const imageref = storage.ref(`/image/${image.name}`).put(image)
            .on("state_change", alert("success"), alert);
        imageref();
    }
    return (
        <div>
            <input type="file" onChange={(e) => { setImage(e.target.files[0]) }} />
            <button onClick={upload}>Upload</button>
        </div>
    );
}

export default FileInput;


