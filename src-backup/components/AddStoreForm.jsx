import React, { useEffect, useState } from "react";

import styles from "../styles/AddProductForm.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { faFaceGrinBeamSweat } from "@fortawesome/free-solid-svg-icons";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import "../styles/filepond.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { toast } from "react-hot-toast";
import { addProduct, addStore } from "../api";
import { addInventoryItem, setStore } from "../actions";
import store from "../Store";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize
);

export default function AddStoreForm(props) {
  const { dispatch } = props;

  const [address, setAddress] = useState("");
  const [gst, setGst] = useState("");
  const [storeTimings, setStoreTimings] = useState("");
  const [file, setFile] = useState([]);

  const handleAddStore = async () => {
    if (!address) {
      return toast.error("Address cannot be empty!");
    } else if (!gst) {
      return toast.error("GST cannot be empty!");
    } else if (!storeTimings) {
      return toast.error("Store timings cannot be empty!");
    } else if (!file) {
      return toast.error("file cannot be empty!");
    }

    const response = await toast.promise(
      addStore(address, gst, storeTimings, file),
      {
        loading: "Creating store...",
        success: "Store created successfully!",
        error: "Something went wrong",
      }
    );

    if (response.success) {
      dispatch(setStore(response.data.store));
      setAddress("");
      setGst("");
      setStoreTimings("");
      setFile("");
      return;
    }
    toast.error("Something went wrong. Try again later!");
  };

  return (
    <div id="new-store-form">
      <input
        type="text"
        placeholder="Enter address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter GST number"
        value={gst}
        onChange={(e) => setGst(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter store timings"
        value={storeTimings}
        onChange={(e) => setStoreTimings(e.target.value)}
      />
      <FilePond
        files={file}
        onupdatefiles={(fileItems) => {
          // Set currently active file objects to this.state
          setFile(fileItems.map((fileItem) => fileItem.file));
        }}
        allowMultiple={false}
        maxFiles={1}
        allowFileTypeValidation={true}
        acceptedFileTypes={["image/*"]}
        allowFileSizeValidation={true}
        maxFileSize={"5MB"}
        name="filepond" /* sets the file input name, it's filepond by default */
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />

      <button onClick={handleAddStore}>Create Store</button>
    </div>
  );
}
