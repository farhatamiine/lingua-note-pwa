import { Button } from "@/components/ui/button";
import { useAppBar } from "@/context/AppBarContext";
import { ArrowLeft } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router";

function ReviewPage() {
  const { setConfig } = useAppBar();
  const navigate = useNavigate();

  const BackButton = useMemo(() => {
    return (
      <Button
        variant={"ghost"}
        onClick={() => {
          navigate("/");
        }}
      >
        <ArrowLeft />
      </Button>
    );
  }, [navigate]);

  useEffect(() => {
    setConfig({
      leftContent: BackButton,
      isBorderBottom: false,
      title: "Review Session",
      rightContent: null,
    });
  }, [setConfig, BackButton]);
  return <div>ReviewPage</div>;
}

export default ReviewPage;
