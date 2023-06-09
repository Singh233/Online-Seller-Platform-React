import React, { useEffect, useState } from "react";

import styles from "../styles/AddProductForm.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import "../styles/filepond.css";
import "animate.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { toast } from "react-hot-toast";
import { addProduct } from "../api";
import { addInventoryItem } from "../actions";
import Dropdown from "./Dropdown";
import store from "../Store";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize
);

export default function AddProductForm(props) {
  const { dispatch, categoriesReducer, subcategoriesReducer, setCardClick } =
    props;

  const [productName, setProductName] = useState("");
  const [MRP, setMRP] = useState("");
  const [SP, setSP] = useState("");
  const [QTY, setQTY] = useState("");
  const [file, setFile] = useState([]);
  const [categoryName, setCategoryName] = useState("Please select category");
  const [subCategoryName, setSubCategoryName] = useState(
    "Please select sub"
  );
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");

  const handleAddProduct = async () => {
    const sellerId = store.getState().user._id;

    if (!store.getState().store) {
      return toast.error("Create your store first");
    }
    const storeId = store.getState().store._id;

    if (!productName) {
      return toast.error("Product name cannot be empty!");
    } else if (!MRP) {
      return toast.error("MRP cannot be empty!");
    } else if (!SP) {
      return toast.error("SP cannot be empty!");
    } else if (!QTY) {
      return toast.error("QTY cannot be empty!");
    } else if (!file) {
      return toast.error("file cannot be empty!");
    } else if (!categoryId) {
      return toast.error("Category cannot be empty!");
    } else if (!subcategoryId) {
      return toast.error("Subcategory cannot be empty!");
    }

    const response = await toast.promise(
      addProduct(
        sellerId,
        storeId,
        categoryId,
        subcategoryId,
        productName,
        MRP,
        SP,
        QTY,
        file
      ),
      {
        loading: "Adding product to inventory...",
        success: "Product added successfully!",
        error: "Something went wrong",
      }
    );

    console.log(response);
    if (response.success) {
      dispatch(addInventoryItem(response.data));
      setProductName("");
      setQTY("");
      setFile("");
      setMRP("");
      setCategoryId("");
      setCategoryName("Please select a category");
      setSubcategoryId("");
      setSubCategoryName("Please select a sub-category");
      return;
    }
    toast.error("Something went wrong. Try again later!");
  };

  return (
    <div
      className={`${styles.container} animate__animated animate__faster animate__fadeIn`}
    >
      <div className={styles.wrapper}>
        <p className={styles.heading}>Add new Product</p>
        <FontAwesomeIcon
          onClick={() => setCardClick("")}
          className={styles.removeIcon}
          icon={faXmark}
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
        <div className={styles.customPosition1}>
          <Dropdown
            categories={categoriesReducer}
            categoryName={categoryName}
            setCategoryName={setCategoryName}
            categoryId={categoryId}
            setCategoryId={setCategoryId}
          />
        </div>

        <div className={styles.customPosition2}>
        <Dropdown
          categories={subcategoriesReducer}
          categoryName={subCategoryName}
          setCategoryName={setSubCategoryName}
          categoryId={subcategoryId}
          setCategoryId={setSubcategoryId}
        />
        </div>

        

        <input
        className={styles.firstInput}
          type="text"
          placeholder="Product name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter MRP"
          value={MRP}
          onChange={(e) => setMRP(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter quantity"
          value={QTY}
          onChange={(e) => setQTY(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter Selling price"
          value={SP}
          onChange={(e) => setSP(e.target.value)}
        />

        <button className={styles.submitButton} onClick={handleAddProduct}>
          Create Product
        </button>
      </div>
    </div>
  );
}
