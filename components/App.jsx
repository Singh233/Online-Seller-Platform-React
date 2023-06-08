import "../styles/App.css";

import { Routes, Route, Navigate } from "react-router-dom";

import SignInUp from "../pages/SignInUp";
import { getItemInLocalStorage, LOCALSTORAGE_TOKEN_KEY, removeItemInLocalStorage } from "../utils";

function PrivateRoute({ children }) {
  return getItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY) ? (
    children
  ) : (
    <Navigate to="/sign-in-up" />
  );
}

function App() {

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              {/* <Navbar />
              <Home /> */}
            </PrivateRoute>
          }
        />
        {/* <Route path="/" element={<Home />} /> */}

        <Route path="/sign-in-up" element={<SignInUp />} />
      </Routes>
    </div>
  );
}

export default App;
