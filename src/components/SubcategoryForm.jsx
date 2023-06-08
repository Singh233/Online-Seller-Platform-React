import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { addCategory, addSubcategory } from "../actions";
import { createCategory, createSubcategory } from "../api";

import styles from "../styles/SubcategoryForm.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { faFaceGrinBeamSweat } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "./Dropdown";

export default function SubcategoryForm(props) {
  const { dispatch, categoriesReducer, subcategoriesReducer } = props;
  const [subCategoryName, setSubCategoryName] = useState("");
  const [categoryName, setCategoryName] = useState("Please select option");
  const [categoryId, setCategoryId] = useState("");

  const handleAddCategory = async () => {
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
    <div>
      <Dropdown
        categories={categoriesReducer}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
      />
      <input
        type="text"
        value={subCategoryName}
        onChange={(e) => {
          setSubCategoryName(e.target.value);
        }}
      />
      <button onClick={handleAddCategory}>Add Subcategory</button>
    </div>
  );
}
