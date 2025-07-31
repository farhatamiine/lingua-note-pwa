import { useAppBar } from "@/context/AppBarContext";
import { useEffect } from "react";

function ReviewPage() {
  const { setConfig } = useAppBar();

  useEffect(() => {
    setConfig({
      leftContent: null,
      isBorderBottom: false,
      title: "Review Session",
      rightContent: null,
    });
  }, [setConfig]);
  return <div>ReviewPage</div>;
}

export default ReviewPage;
