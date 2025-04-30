import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./store.js";
import { Provider } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider
        options={{
          "client-id":
            "AVBe0_I5ELJRyZYL9CErWe8bd0svm_XqBRXVc2wZwPjXZY49VuVrCDYmlT1FP5RPtM0SLXZo4371scty",
        }}
      >
        <App />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>,
);
