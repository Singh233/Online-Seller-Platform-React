import { useState } from "react";
import styles from "../styles/Dropdown.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { faFaceGrinBeamSweat } from "@fortawesome/free-solid-svg-icons";

// Functional Component
const Dropdown = (props) => {
  const { categories, categoryName, setCategoryName, categoryId, setCategoryId } = props;

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

  return (
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
          {categories &&
            categories.length > 0 &&
            categories.map((category) => {
              return (
                <p
                  key={`item-${category._id}`}
                  onClick={() =>
                    handleCategoryClick(category.name, category._id)
                  }
                  className={styles.option1}
                >
                  {category.name}
                </p>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
