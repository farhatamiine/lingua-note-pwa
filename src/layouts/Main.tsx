import { BottomNavigation } from "@/components/ui/bottomNavigation";
import { useAppBar } from "@/context/AppBarContext";
import { cn } from "@/lib/utils";

import { Outlet } from "react-router";

export const MainLayout = () => {
  const { config } = useAppBar();

  return (
    <div className="flex flex-col min-h-svh">
      <header
        className={cn(
          "bg-white px-4 py-5 flex items-center",
          config.isBorderBottom !== false && "border-b"
        )}
      >
        <div className="flex-1 flex justify-start">{config.leftContent}</div>
        <h1 className="text-xl font-bold">{config.title}</h1>
        <div className="flex-1 flex justify-end">{config.rightContent}</div>
      </header>
      <main className="flex-grow overflow-y-auto">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};
