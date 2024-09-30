import React, { useState } from "react";
import { http_client } from "../../app/axios";
import { useGlobalState } from "../../app/global_store";
import { ImageDownloadURL } from "../../env";
import toast from "react-hot-toast";

const FileUpload = ({ form_key, setValue, image, ...rest }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const {
    user_info: { access_token },
  } = useGlobalState();

  const handleFileChange = async (event) => {
    const image_file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", image_file);

    const res = await http_client
      .post("files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${access_token}`,
        },
        onUploadProgress: (progressEvent) => {
          const upload_progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(upload_progress);
          if (upload_progress === 100) {
            setTimeout(() => setUploadProgress(0), 2000);
          }
        },
      })
      .catch((error) => {
        console.error("Error uploading file: ", error);
      });
    const body = res.data;

    if (body.code === 1200) {
      const content = body.content;
      console.log("File uploaded successfully: ", content.filename);
      toast.success("File uploaded successfully");
      setValue(form_key, content.filename);
    }
  };
  return (
    <>
      <input type="file" hidden onChange={handleFileChange} {...rest} />
      {uploadProgress > 0 && (
        <div className=" w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-[#151515] h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
        </div>
      )}
      {image ? <img className={"w-56 rounded-xl"} src={`${ImageDownloadURL}${image}`} alt={`${form_key} image`} /> : <></>}
    </>
  );
};

export default FileUpload;
