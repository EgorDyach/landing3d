import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { MainPage } from "./MainPage";
import { AdminPage } from "./AdminPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
