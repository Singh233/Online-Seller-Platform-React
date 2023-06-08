import React, { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

export default function SignInUp() {
  const [isLoginContainerOpen, setIsLoginContainerOpen] = useState(true);
  return (
    <>
      {isLoginContainerOpen ? (
        <SignIn toggleContainer={{ setIsLoginContainerOpen }} />
      ) : (
        <SignUp toggleContainer={{ setIsLoginContainerOpen }} />
      )}
    </>
  );
}
