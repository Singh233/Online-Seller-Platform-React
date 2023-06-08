import React, { useState } from "react";

import styles from "../styles/SignInUp.module.scss";
import { toast } from "react-hot-toast";
import { signUp } from "../api/";

export default function SignUp(props) {
  const { setIsLoginContainerOpen } = props.toggleContainer;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegistration = async () => {
    if (!email) {
      return toast.error("Email cannot be empty!");
    } else if (!password) {
      return toast.error("Password cannot be empty!");
    } else if (!businessName) {
      return toast.error("Password cannot be empty!");
    } else if (!confirmPassword) {
      return toast.error("Confirm password cannot be empty!");
    }

    const response = await signUp(
      email,
      businessName,
      password,
      confirmPassword
    );
    console.log(response);
    if (response.success) {
      return toast.success("Registered successfully!");
    }
    toast.error(response.message);
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.wrapper}>
        <div className={styles.leftInfoContainer}>
          <div className={styles.heading}>
            <p> Seller Platform </p>
          </div>

          <div className={styles.midAbout}>
            <p className={styles.heading}>Start your journey with us!</p>
            <p className={styles.subHeading}>
              Discover the world's best Online Seller Platform for business
              owners
            </p>
          </div>

          <div className={styles.footerInfo}>
            Already have an account?
            <p onClick={() => setIsLoginContainerOpen(true)}>
              Sign In here
            </p>
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
            type="text"
            placeholder="Business name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={handleRegistration}>Create Account</button>
        </div>
      </div>
    </div>
  );
}
