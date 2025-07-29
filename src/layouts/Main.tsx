import { BottomNavigation } from "@/components/ui/bottomNavigation";
import { useAppBar } from "@/context/AppBarContext";

import { Outlet } from "react-router";

export const MainLayout = () => {
  const { config } = useAppBar();

  return (
    <div className="flex flex-col min-h-svh">
      <header className="bg-white border-b px-4 py-3 flex items-center justify-between shadow-sm">
        {config.leftContent}
        <h1 className="text-lg font-semibold">{config.title}</h1>
        {config.rightContent}
      </header>
      <main className="flex-grow overflow-y-auto">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};
