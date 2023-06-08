import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Toaster toastOptions={{
        className: 'toast',
        // position: 'bottom-center',
        style: {
          border: '1px solid rgba( 255, 255, 255, 0.18 )',
          backgroundColor: 'rgba(185, 185, 185, 0.202)',
          color: 'white',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',

        },
      }}/>
  </React.StrictMode>
);
