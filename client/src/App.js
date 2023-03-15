import router from "./routes";
import { RouterProvider } from "react-router-dom";
import './App.css';
// import { Provider } from 'react-redux'
// import store from "./stores";

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
