import "../styles/App.css";

import { Routes, Route, Navigate } from "react-router-dom";

import SignInUp from "../pages/SignInUp";
import {
  getItemInLocalStorage,
  LOCALSTORAGE_TOKEN_KEY,
  removeItemInLocalStorage,
} from "../utils";
import Navbar from "./Navbar";
import Dashboard from "../pages/Dashboard";

function PrivateRoute({ children }) {
  return getItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY) ? (
    children
  ) : (
    <Navigate to="/sign-in-up" />
  );
}

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Navbar />
            <Dashboard />
          </PrivateRoute>
        }
      />
      {/* <Route path="/" element={<Home />} /> */}

      <Route path="/sign-in-up" element={<SignInUp />} />
    </Routes>
  );
}

export default App;
