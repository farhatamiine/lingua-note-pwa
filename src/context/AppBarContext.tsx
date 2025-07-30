import { createContext, ReactNode, useContext, useState } from "react";

type AppBarConfig = {
  leftContent?: React.ReactNode;
  title: string;
  isBorderBottom?: boolean;
  rightContent?: React.ReactNode;
};

const AppBarContext = createContext<{
  config: AppBarConfig;
  setConfig: (config: AppBarConfig) => void;
}>({
  config: { title: "Lingua App" },
  setConfig: () => {},
});

export const AppBarProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<AppBarConfig>({ title: "Lingua App" });
  return (
    <AppBarContext value={{ config, setConfig }}>{children}</AppBarContext>
  );
};

export const useAppBar = () => useContext(AppBarContext);
