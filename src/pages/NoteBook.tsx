import { useAppBar } from "@/context/AppBarContext";
import { useEffect } from "react";

function NoteBookPage() {
  const { setConfig } = useAppBar();

  useEffect(() => {
    setConfig({
      title: "My Notebook",
      isBorderBottom: false,
    });
  }, [setConfig]);

  return (
    <div className="container mx-auto p-3 max-w-6xl overflow-y-auto">
      <div className="h-[calc(100vh-8rem)] overflow-y-auto"></div>
    </div>
  );
}

export default NoteBookPage;
