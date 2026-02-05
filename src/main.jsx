import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";
import { InfoProvider } from "./context/infoContext.jsx";
import { AdminProvider } from "./context/AdminContext.jsx";

createRoot(document.getElementById("root")).render(
  <AdminProvider>
    <InfoProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </InfoProvider>
  </AdminProvider>,
);
