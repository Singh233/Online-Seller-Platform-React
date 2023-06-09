import React, { useEffect, useState } from "react";

import styles from "../styles/Dashboard.module.scss";

// fontawesome for icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { faSquarePollHorizontal } from "@fortawesome/free-solid-svg-icons";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import { faBoxesStacked } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import {
  addCategory,
  clearUser,
  setCategories,
  setProducts,
  setStore,
  setSubcategory,
  setUser,
} from "../actions";
import {
  LOCALSTORAGE_TOKEN_KEY,
  getItemInLocalStorage,
  removeItemInLocalStorage,
} from "../utils";
import { Link, Navigate, useNavigate } from "react-router-dom";
import store from "../Store";
import { getSellerProfile } from "../api";
import jwtDecode from "jwt-decode";
import CategoryForm from "../components/CategoryForm";
import SubcategoryForm from "../components/SubcategoryForm";
import AddProductForm from "../components/AddProductForm";
import AddStoreForm from "../components/AddStoreForm";

function Dashboard(props) {
  const {
    dispatch,
    userReducer,
    storeReducer,
    categoriesReducer,
    subcategoriesReducer,
  } = props;

  const [cardClick, setCardClick] = useState("");
  const navigate = useNavigate();
  const businessName = store.getState().user.businessName;

  useEffect(() => {
    const sellerProfile = async () => {
      const userToken = getItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY);
      if (userToken) {
        const user = jwtDecode(userToken);
        const response = await getSellerProfile(user._id);
        const { seller, categories, subCategories, store, products } =
          response.data;

        dispatch(setUser(seller));
        dispatch(setCategories(categories));
        dispatch(setStore(store));
        dispatch(setProducts(products));
        dispatch(setSubcategory(subCategories));
      }
    };

    sellerProfile();
  }, []);

  const handleLogout = () => {
    dispatch(clearUser());
    removeItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    navigate("/sign-in-up");
  };
  return (
    <div className={styles.container}>
      <div className={styles.urlCard}>
        <p className={styles.info}>Your Store's URL</p>

        <Link className={styles.url} to={`http://127.0.0.1:5173/store/${businessName}`}>
          http://127.0.0.1:5173/store/{businessName}
        </Link>
      </div>

      <div className={styles.statsWrapper}></div>

      <div className={styles.cardsWrapper}>
        <div
          onClick={() => setCardClick("CREATESTORE")}
          className={styles.addStoreCard}
        >
          <p>
            <FontAwesomeIcon icon={faBox} />
            Create Store
          </p>
        </div>
        <div
          onClick={() => setCardClick("CREATECATEGORY")}
          className={styles.addCategoryCard}
        >
          <p>
            <FontAwesomeIcon icon={faBox} />
            Add new Category
          </p>
        </div>
        <div
          onClick={() => setCardClick("CREATESUBCATEGORY")}
          className={styles.addSubCategoryCard}
        >
          <p>
            <FontAwesomeIcon icon={faSquarePollHorizontal} />
            Add new Sub-category
          </p>
        </div>
        <div
          onClick={() => setCardClick("CREATEPRODUCT")}
          className={styles.addInventoryCard}
        >
          <p>
            <FontAwesomeIcon icon={faBoxesStacked} />
            Add new Product to your inventory
          </p>
        </div>
      </div>

      <button onClick={handleLogout}>Logout</button>

      {cardClick === "CREATESTORE" ? (
        <AddStoreForm dispatch={dispatch} setCardClick={setCardClick} />
      ) : cardClick === "CREATECATEGORY" ? (
        <CategoryForm
          dispatch={dispatch}
          categoriesReducer={categoriesReducer}
          setCardClick={setCardClick}
        />
      ) : cardClick === "CREATESUBCATEGORY" ? (
        <SubcategoryForm
          dispatch={dispatch}
          categoriesReducer={categoriesReducer}
          subcategoriesReducer={subcategoriesReducer}
          setCardClick={setCardClick}
        />
      ) : cardClick === "CREATEPRODUCT" ? (
        <AddProductForm
          dispatch={dispatch}
          categoriesReducer={categoriesReducer}
          subcategoriesReducer={subcategoriesReducer}
          userReducer={userReducer}
          storeReducer={storeReducer}
          setCardClick={setCardClick}
        />
      ) : (
        ""
      )}
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
