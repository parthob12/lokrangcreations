import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./style.css"; // Make sure styles are imported

console.log("Starting application..."); // Debug log

try {
  const rootElement = document.getElementById("root");
  console.log("Root element found:", rootElement); // Debug log

  if (!rootElement) {
    throw new Error("Root element not found in the DOM");
  }

  const root = ReactDOM.createRoot(rootElement);
  console.log("React root created"); // Debug log

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("App rendered"); // Debug log
} catch (error) {
  console.error("Error initializing React app:", error);
}
