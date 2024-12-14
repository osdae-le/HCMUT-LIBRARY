import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.js";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { clearSearchResult } from "./redux/authSlice.js";

const onBeforeLift = () => {
  store.dispatch(clearSearchResult());
};
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate
      loading={null}
      persistor={persistor}
      onBeforeLift={onBeforeLift}
    >
      <App />
    </PersistGate>
  </Provider>
);
