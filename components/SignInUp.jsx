import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function SignInUp() {
  const [isLoginContainerOpen, setIsLoginContainerOpen] = useState(true);
  return (
    <>
      {isLoginContainerOpen ? (
        <SignIn toggleContainer={{setIsLoginContainerOpen}} />
      ) : (
        <SignUp toggleContainer={{setIsLoginContainerOpen}}/>
      )}
    </>
  );
}
