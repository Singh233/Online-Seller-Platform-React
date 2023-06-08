import React, { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import { connect } from "react-redux";

function SignInUp(props) {
  const { dispatch } = props;
  const [isLoginContainerOpen, setIsLoginContainerOpen] = useState(true);
  return (
    <>
      {isLoginContainerOpen ? (
        <SignIn
          toggleContainer={{ setIsLoginContainerOpen }}
          dispatch={dispatch}
        />
      ) : (
        <SignUp
          toggleContainer={{ setIsLoginContainerOpen }}
          dispatch={dispatch}
        />
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    userReducer: state.user,
  };
};

const connectedDashboardComponent = connect(mapStateToProps)(SignInUp);

export default connectedDashboardComponent;
