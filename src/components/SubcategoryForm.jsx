import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { addCategory, addSubcategory } from "../actions";
import { createCategory, createSubcategory } from "../api";


import styles from "../styles/SubcategoryForm.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import Dropdown from "./Dropdown";
import store from "../Store";

export default function SubcategoryForm(props) {
  const { dispatch, categoriesReducer, setCardClick } = props;
  const [subCategoryName, setSubCategoryName] = useState("");
  const [categoryName, setCategoryName] = useState("Please select category");
  const [categoryId, setCategoryId] = useState("");

  const handleAddCategory = async () => {
    if (!store.getState().store) {
      return toast.error("Create your store first");
    }
    if (!categoryId) {
      return toast.error("Please choose category also!");
    }
    if (!subCategoryName) {
      return toast.error("Subcategory cannot be empty!");
    }
    const response = await toast.promise(
      createSubcategory(subCategoryName, categoryId),
      {
        loading: "Adding subcategory...",
        success: "Subcategory added!",
        error: "Something went wrong!",
      }
    );

    if (response.success) {
      dispatch(addSubcategory(response.data.subCategory));
      setSubCategoryName("");
    }
  };

  return (
    <div
      className={`${styles.container} animate__animated animate__faster animate__fadeIn`}
    >
      <div className={styles.wrapper}>
        <p className={styles.heading}>Add new Subcategory</p>
        <FontAwesomeIcon
          onClick={() => setCardClick("")}
          className={styles.removeIcon}
          icon={faXmark}
        />
        <Dropdown
          categories={categoriesReducer}
          categoryName={categoryName}
          setCategoryName={setCategoryName}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
        />
        <input
          type="text"
          placeholder="Enter sub-category name"
          value={subCategoryName}
          onChange={(e) => {
            setSubCategoryName(e.target.value);
          }}
        />
        <button className={styles.submitButton} onClick={handleAddCategory}>Add Subcategory</button>
      </div>
    </div>
  );
}
