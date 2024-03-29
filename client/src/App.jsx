import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootPage, { loader as rootLoader } from "./routes/Root";
import CreatePage from "./routes/Create";
import EditPage, { loader as editLoader } from "./routes/Edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    loader: rootLoader,
  },
  {
    path: "/create",
    element: <CreatePage />,
  },
  {
    path: "/:id/edit",
    element: <EditPage />,
    loader: editLoader,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
