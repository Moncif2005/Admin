import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import UsersPage from "./pages/UsersPage";
import CoursesPage from "./pages/CoursesPage";
import EnrollmentsPage from "./pages/EnrollmentsPage";
import ExamsPage from "./pages/ExamsPage";
import JobOffersPage from "./pages/JobOffersPage";
import CertificatesPage from "./pages/CertificatesPage";
import PaymentPage from "./pages/PaymentPage";
import StatsPage from "./pages/StatsPage";
import SettingsPage from "./pages/SettingsPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/",
    Component: ProtectedRoute,
    children: [
      {
        path: "/",
        Component: Layout,
        children: [
          { index: true, Component: DashboardPage },
          { path: "users", Component: UsersPage },
          { path: "courses", Component: CoursesPage },
          { path: "enrollments", Component: EnrollmentsPage },
          { path: "exams", Component: ExamsPage },
          { path: "job-offers", Component: JobOffersPage },
          { path: "certificates", Component: CertificatesPage },
          { path: "payments", Component: PaymentPage },
          { path: "statistics", Component: StatsPage },
          { path: "settings", Component: SettingsPage },
        ],
      },
    ],
  },
]);