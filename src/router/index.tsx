import { createBrowserRouter } from "react-router";
import HomePage from "../pages/Home";
import NotesPage from "../pages/Notes";
import ProfilePage from "../pages/Profile";
import NoteDetailsPage from "../pages/NoteDetails";
import SigninPage from "@/pages/Signin";
import SignupPage from "@/pages/Signup";
import PrivateRoute from "@/components/PrivateRoute";
import { MainLayout } from "@/layouts/Main";
import ReviewPage from "@/pages/Review";

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
        path: "/notes",
        element: <NotesPage />,
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
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },
]);
