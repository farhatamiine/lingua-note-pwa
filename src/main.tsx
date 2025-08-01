import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { AppBarProvider } from "./context/AppBarContext.tsx";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import { registerSW } from "virtual:pwa-register";
import { toast, Toaster } from "sonner";
const queryClient = new QueryClient();

const updateSW = registerSW({
  onNeedRefresh() {
    toast("🚀 New version available", {
      description: "Click to update",
      action: {
        label: "Refresh",
        onClick: () => updateSW(true), // triggers service worker update
      },
    });
  },
  onOfflineReady() {
    toast("✅ App is ready for offline use");
  },
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <Provider store={store}>
        <AppBarProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <Toaster richColors position="top-right" />
          </QueryClientProvider>
        </AppBarProvider>
      </Provider>
    </AuthContextProvider>
  </StrictMode>
);
