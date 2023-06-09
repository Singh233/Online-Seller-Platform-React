import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import styles from "../styles/Navbar.module.scss";

// fontawesome for icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";

// icons
import menu from "../assets/icons/menu.svg";
import LoadingBar from "react-top-loading-bar";
import store from "../Store";

export default function Navbar() {
  // state to toggle smNavContainer
  const [toggle, setToggle] = React.useState(true);

  // state for cart count
  const [cartCount, setCartCount] = React.useState(0);

  // ref for loading bar
  const ref = React.useRef(null);

  // state for navigation selected
  const [selected, setSelected] = React.useState(window.location.pathname);

  // function to toggle smNavContainer
  const toggleNav = () => {
    setToggle(!toggle);
  };
  const navigate = useNavigate();

  useEffect(() => {
    setSelected(window.location.pathname);

    // get cart from local storage
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      setCartCount(cart.length);
    }
  }, [navigate]);

  return (
    <>
      <LoadingBar color="#ffc300" ref={ref} />

      <div className={styles.navContainer}>
        <div className={styles.branding}>
          <div className={styles.square}></div>
          <p> Seller Platform</p>
        </div>

        <div className={styles.navLinks}></div>

        <div className={styles.navIcons}>
          <Link
            onClick={() => ref.current.complete()}
            className={`${selected === "/" ? styles.selected : ""}`}
            to="/"
          >
            <FontAwesomeIcon icon={faCircleUser} />
          </Link>
        </div>

        <div className={styles.smMenu} onClick={toggleNav}>
          <Link
            onClick={() => ref.current.complete()}
            className={`${selected === "/" ? styles.selected : ""}`}
            to="/"
          >
            <FontAwesomeIcon icon={faCircleUser} />
          </Link>
        </div>
      </div>
    </>
  );
}
