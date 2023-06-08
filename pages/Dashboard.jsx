import React, { useEffect } from "react";

import styles from "../styles/Dashboard.module.scss";

// fontawesome for icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { faSquarePollHorizontal } from "@fortawesome/free-solid-svg-icons";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import { faBoxesStacked } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { clearUser } from "../actions";
import { LOCALSTORAGE_TOKEN_KEY, removeItemInLocalStorage } from "../utils";
import { Navigate, useNavigate } from "react-router-dom";
import store from "../Store";

function Dashboard(props) {
  const { dispatch, userReducer } = props;
  const navigate = useNavigate();


  console.log(userReducer)
  useEffect(() => {

  })

  const handleLogout = () => {
    dispatch(clearUser());
    removeItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    navigate("/sign-in-up");
  };
  return (
    <div className={styles.container}>
      <div className={styles.urlCard}>
        <p className={styles.info}>Your Store's URL</p>
        <p className={styles.url}>https://example.com</p>
      </div>

      <div className={styles.statsWrapper}></div>

      <div className={styles.cardsWrapper}>
        <div className={styles.addCategoryCard}>
          <p>
            <FontAwesomeIcon icon={faBox} />
            Add new Category
          </p>
        </div>
        <div className={styles.addSubCategoryCard}>
          <p>
            <FontAwesomeIcon icon={faSquarePollHorizontal} />
            Add new Sub-category
          </p>
        </div>
        <div className={styles.addInventoryCard}>
          <p>
            <FontAwesomeIcon icon={faBoxesStacked} />
            Add new Product to your inventory
          </p>
        </div>
      </div>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userReducer: state.user,
    storeReducer: state.store,
    categoriesReducer: state.categories,
    subcategoriesReducer: state.subcategories,
    inventoryReducer: state.inventory,
    searchReducer: state.searchResults,
  };
};

const connectedDashboardComponent = connect(mapStateToProps)(Dashboard);

export default connectedDashboardComponent;
