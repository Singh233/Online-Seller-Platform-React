import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { addCategory } from "../actions";
import { createCategory } from "../api";

export default function CategoryForm(props) {
  const { dispatch, categoriesReducer } = props;
  const [categoryName, setCategoryName] = useState("");

  const handleAddCategory = async () => {
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
      setCategoryName('');
    }
  };
  return (
    <div>
      <input
        type="text"
        value={categoryName}
        onChange={(e) => {
          setCategoryName(e.target.value);
        }}
      />
      <button onClick={handleAddCategory}>Add Category</button>
    </div>
  );
}
