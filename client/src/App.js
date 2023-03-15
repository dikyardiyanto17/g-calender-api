import router from "./routes";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./stores";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId="590607211046-qkalmrqhj5de79s05sth7pnsoajiklvb.apps.googleusercontent.com">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
