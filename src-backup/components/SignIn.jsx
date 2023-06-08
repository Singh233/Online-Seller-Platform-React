import React, { useState } from "react";

import styles from "../styles/SignInUp.module.scss";
import { toast } from "react-hot-toast";
import { login } from "../api/";
import { LOCALSTORAGE_TOKEN_KEY, setItemInLocalStorage } from "../utils";
import { setUser } from "../actions";
import { useNavigate } from "react-router-dom";

export default function SignIn(props) {
  const { dispatch, toggleContainer } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoginContainerOpen } = toggleContainer;
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      return toast.error("Email or password cannot be empty!");
    }

    const response = await login(email, password);
    if (response.success) {
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      dispatch(setUser(response.data.user));
      navigate("/");
      return toast.success("Logged in successfully!");
    }
    toast.error(response.message);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.wrapper}>
        <div className={styles.leftInfoContainer}>
          <div className={styles.heading}>
            <p> Seller Platform </p>
          </div>

          <div className={styles.midAbout}>
            <p className={styles.heading}>Welcome Back!</p>
            <p className={styles.subHeading}>
              Discover the world's best Online Seller Platform for business
              owners
            </p>
          </div>

          <div className={styles.footerInfo}>
            Don't have an account?
            <p onClick={() => setIsLoginContainerOpen(false)}>Sign Up now</p>
          </div>
        </div>

        <div className={styles.rightInputContainer}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}
