import React, { useEffect, useState } from "react";
import { getStoreFront } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "../styles/StoreFront.module.scss";
import ProductCard from "../components/ProductCard";
import { faBoxesStacked, faClock, faStore } from "@fortawesome/free-solid-svg-icons";
export default function StoreFront() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [store, setStore] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  let path = window.location.pathname.split("/");
  path = path[path.length - 1];

  useEffect(() => {
    const getStore = async () => {
      const response = await getStoreFront(path);

      if (response.success) {
        setProducts(response.data.products);
        setCategories(response.data.categories);
        setSubCategories(response.data.subCategories);
        setStore(response.data.store);
      }
    };
    getStore();
  }, []);

  const searchProduct = (e) => {
    setSearchText(e.target.value);
    const results = products.filter(
      (product) => product.productName === e.target.value
    );
    if (results) {
      setSearchResults(results);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <img src={store && store.logo} />
        <p>Welcome to {path} Store</p>
      </div>
      <p className={styles.subHeading}>
        Explore and Search anything you would like to buy on store!
      </p>

      <div className={styles.statsList}>
        <div className={styles.card}>
          <FontAwesomeIcon icon={faClock} />
          <p>{store && store.storeTimings}</p>
          <p className={styles.cardHeading}>Shop Timings</p>
        </div>
        <div className={styles.card}>
          <FontAwesomeIcon icon={faStore} />
          <p>{store && store.address}</p>
          <p className={styles.cardHeading}>Shop Address</p>
        </div>

        <div className={styles.card}>
          <FontAwesomeIcon icon={faBoxesStacked} />

          <p>{products && products.length}</p>
          <p className={styles.cardHeading}>Available Products</p>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search by product name..."
        value={searchText}
        onChange={(e) => searchProduct(e)}
      />

      {/* <p className={styles.label}>
        Subcategories{" "}
        <span>
          {subCategories && subCategories.length}
        </span>{" "}
      </p>
      <div className={styles.categoriesList}>
        {subCategories &&
          subCategories.length &&
          subCategories.map((category, id) => (
            <>
              <div className={styles.categoryCard}>
                <p>{category.name}</p>
              </div>
            </>
          ))}
      </div>

      <p className={styles.label}>
        Categories <span>{categories && categories.length}</span>{" "}
      </p>
      <div className={styles.categoriesList}>
        {categories &&
          categories.map((category, id) => (
            <>
              <div className={styles.categoryCard}>
                <p>{category.name}</p>
              </div>
            </>
          ))}
      </div> */}

      {searchResults && searchResults.length > 0 ? (
        <>
          <p className={`${styles.label} animate__animated animate__fadeIn`}>
            Search Results <span>{searchResults && searchResults.length}</span>
          </p>
          <div className={styles.productsList}>
            {searchResults.map((product, id) => {
              return <ProductCard key={id} product={product} />;
            })}
          </div>
        </>
      ) : (
        <>
          <p className={`${styles.label} animate__animated animate__fadeIn`}>
            All products <span>{products && products.length}</span>
          </p>
          <div className={styles.productsList}>
            {products.map((product, id) => {
              return <ProductCard key={id} product={product} />;
            })}
          </div>
        </>
      )}

      {products && products.length === 0 && (
        <p className={styles.noProducts}>No products listed by Seller!</p>
      )}
    </div>
  );
}
