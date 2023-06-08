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

export default function SubcategoryForm(props) {
  const { dispatch, categoriesReducer, subcategoriesReducer } = props;
  const [subCategoryName, setSubCategoryName] = useState("");
  const [categoryName, setCategoryName] = useState("Please select option");
  const [categoryId, setCategoryId] = useState('');

  const handleCategoryClick = (name, id) => {
    setCategoryName(name);
    setCategoryId(id);
    // get option container and add close class
    const element = document.getElementsByClassName(
      `${styles.selectOption}`
    )[0];
    element.classList.add(`${styles.close}`);

    // close class will be removed after 400ms because transition is set to 0.4s
    setTimeout(() => {
      element.classList.remove(`${styles.close}`);
    }, 400);
  };

  const handleAddCategory = async () => {
    if (!categoryId) {
      return toast.error("Please choose category also!")
    }
    if (!subCategoryName) {
      return toast.error("Subcategory cannot be empty!");
    }
    const response = await toast.promise(createSubcategory(subCategoryName, categoryId), {
      loading: "Adding subcategory...",
      success: "Subcategory added!",
      error: "Something went wrong!",
    });

    if (response.success) {
      dispatch(addSubcategory(response.data.subCategory));
      setSubCategoryName("");
    }
  };

  return (
    <div>
      <div className={styles.dropdownContainer}>
        {/* Select option container */}
        <div className={styles.selectOption}>
          {/* Default option */}
          <p className={styles.defaultOption}>
            <span>{categoryName}</span>
            <FontAwesomeIcon className={styles.arrowIcon} icon={faCaretUp} />
          </p>

          {/* Options container */}
          <div className={styles.options}>
            {/* Iterating over the items array */}
            {categoriesReducer &&
              categoriesReducer.length > 0 &&
              categoriesReducer.map((category) => {
                return (
                  <p
                    key={`item-${category._id}`}
                    onClick={() => handleCategoryClick(category.name, category._id)}
                    className={styles.option1}
                  >
                    {category.name}
                  </p>
                );
              })}
          </div>
        </div>

      </div>
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
