import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { addCategory } from "../actions";
import { createCategory } from "../api";

import styles from "../styles/CategoryForm.module.scss";
import 'animate.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import store from "../Store";

export default function CategoryForm(props) {
  const { dispatch, setCardClick } = props;
  const [categoryName, setCategoryName] = useState("");

  const handleAddCategory = async () => {
    if (!store.getState().store) {
      return toast.error("Create your store first");
    }
    if (!categoryName) {
      return toast.error("Category cannot be empty!");
    }
    const response = await toast.promise(createCategory(categoryName), {
      loading: "Adding category...",
      success: "Category added!",
      error: "Something went wrong!",
    });

    if (response.success) {
      dispatch(addCategory(response.data.category));
      setCategoryName("");
    }
  };
  return (
    <div className={`${styles.container} animate__animated animate__faster animate__fadeIn`}>
      <div className={styles.wrapper}>
        <p className={styles.heading}>Add new Category</p>
        <FontAwesomeIcon
          onClick={() => setCardClick("")}
          className={styles.removeIcon}
          icon={faXmark}
        />
        <input
          type="text"
          placeholder="Enter category name"
          value={categoryName}
          onChange={(e) => {
            setCategoryName(e.target.value);
          }}
        />
        <button className={styles.submitButton} onClick={handleAddCategory}>
          Add Category
        </button>
      </div>
    </div>
  );
}
