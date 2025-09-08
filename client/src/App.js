import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Results from "./pages/Results";
import Elections from "./pages/Elections";
import ElectionDetails from "./pages/ElectionDetails";
import Candidates from "./pages/Candidates";
import Congrats from "./pages/Congrats";
import LogOut from "./pages/LogOut";
import PrivateRoute from "./components/PrivateRoute"; // add this

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "results",
        element: (
          <PrivateRoute>
            <Results />
          </PrivateRoute>
        ),
      },
      {
        path: "election",
        element: (
          <PrivateRoute>
            <Elections />
          </PrivateRoute>
        ),
      },
      {
        path: "elections/:id",
        element: (
          <PrivateRoute>
            <ElectionDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "election/:id/candidates",
        element: (
          <PrivateRoute>
            <Candidates />
          </PrivateRoute>
        ),
      },
      {
        path: "congrats",
        element: (
          <PrivateRoute>
            <Congrats />
          </PrivateRoute>
        ),
      },
      {
        path: "logout",
        element: <LogOut />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
