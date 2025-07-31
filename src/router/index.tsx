import { createBrowserRouter } from "react-router";
import HomePage from "../pages/Home";
import ProfilePage from "../pages/Profile";
import NoteDetailsPage from "../pages/NoteDetails";
import SigninPage from "@/pages/Signin";
import SignupPage from "@/pages/Signup";
import PrivateRoute from "@/components/PrivateRoute";
import { MainLayout } from "@/layouts/Main";
import ReviewPage from "@/pages/Review";
import NoteEditor from "@/pages/NoteEditor";
import NoteBookPage from "../pages/NoteBook";

export const router = createBrowserRouter([
  { path: "/signup", element: <SignupPage /> },
  { path: "/signin", element: <SigninPage /> },
  {
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/notebook",
        element: <NoteBookPage />,
      },
      {
        path: "/notes/:noteSlug",
        element: <NoteDetailsPage />,
      },
      {
        path: "/review",
        element: <ReviewPage />,
      },
      {
        path: "/editor/:action/:noteId?",
        element: <NoteEditor />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },
]);
