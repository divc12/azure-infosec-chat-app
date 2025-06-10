// index.tsx
import App from "./App";
import { ChatProvider } from "./contexts/ChatContext";
import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root container missing in index.html");
}

const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <ChatProvider>
      <App />
    </ChatProvider>
  </React.StrictMode>
);
