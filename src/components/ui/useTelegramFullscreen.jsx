import { useEffect } from "react";

const useTelegramFullscreen = () => {
  useEffect(() => {
    if (!window.Telegram?.WebApp) return;

    const webApp = window.Telegram.WebApp;

    // Mini App tayyor
    webApp.ready();

    // Har doim fullscreenga o‘tkazish
    const expandWebApp = () => {
      try {
        webApp.expand();
      } catch (err) {
        console.warn("WebApp expand ishlamadi:", err);
      }
    };

    expandWebApp();

    // Input yoki button bosilganda yana expand qilish (touch event)
    const handleUserInteraction = () => expandWebApp();

    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("touchstart", handleUserInteraction);

    // Viewport sozlamalari
    const meta = document.querySelector('meta[name="viewport"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover",
      );
    }

    // Body CSS
    document.body.style.overflow = "hidden";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.documentElement.style.overflow = "hidden";

    // Cleanup
    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
    };
  }, []);
};

export default useTelegramFullscreen;
