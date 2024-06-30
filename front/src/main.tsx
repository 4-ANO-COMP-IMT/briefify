import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/home.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./pages/sign-in.tsx";
import SignUp from "./pages/sign-up.tsx";
import Layout from "./components/layout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  </React.StrictMode>,
);
