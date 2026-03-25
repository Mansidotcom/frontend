import { StrictMode } from "react";
import { createRoot } from "react-dom/client";   // ✅ ADD THIS
import App from "./App";
import "./index.css";
import { Toaster } from "./components/ui/sonner";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/Store";
import "./lib/auth"; // Setup axios interceptors for token refresh


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toaster />
      </PersistGate>
    </Provider>
  </StrictMode>
);
