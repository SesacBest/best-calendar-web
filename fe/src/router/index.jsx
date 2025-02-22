import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      // {
      //   index: true,
      //   element: <Home />,
      // },
      // {
      //   path: "/posts",
      //   element: <PostList />,
      // },
    ],
  },
]);

export default router;