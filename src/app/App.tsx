import { RouterProvider } from "react-router";
import { router } from "./routes";
import { LanguageProvider } from "./contexts/LanguageContext";
import { NotificationProvider } from "./contexts/NotificationContext";

export default function App() {
  return (
    <LanguageProvider>
      <NotificationProvider>
        <RouterProvider router={router} />
      </NotificationProvider>
    </LanguageProvider>
  );
}