import React, { useEffect, useState } from "react";
import { getStoreFront } from "../api";

import styles from "../styles/StoreFront.module.scss";
import ProductCard from "../components/ProductCard";
export default function StoreFront() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const getStore = async () => {
      let path = window.location.pathname.split("/");
      path = path[path.length - 1];

      const response = await getStoreFront(path);

      if (response.success) {
        setProducts(response.data.products);
        setCategories(response.data.categories);
        setSubCategories(response.data.subCategories);
      }
    };
    getStore();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <p>Welcome to Top G Store</p>
      </div>
      <p className={styles.subHeading}>
        Explore and Search anything you would like to buy on store!
      </p>

      <input
        type="text"
        placeholder="Search here..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <p className={styles.label}>
        Subcategories <span>{subCategories && subCategories.length}</span>{" "}
      </p>
      <div className={styles.categoriesList}>
        {subCategories.map((category, id) => (
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
        {categories.map((category, id) => (
          <>
            <div className={styles.categoryCard}>
              <p>{category.name}</p>
            </div>
          </>
        ))}
      </div>

      <p className={styles.label}>
        All products <span>{products && products.length}</span>
      </p>
      <div className={styles.productsList}>
        {products.map((product, id) => {
          return <ProductCard key={id} product={product} />;
        })}
      </div>
    </div>
  );
}
