import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

function GoBackButton({ route }: { route: string }) {
  const navigate = useNavigate();

  return (
    <Button
      variant={"link"}
      onClick={() => {
        if (route === "back") {
          navigate(-1);
        } else {
          navigate(route);
        }
      }}
    >
      <ArrowLeft />
    </Button>
  );
}

export default GoBackButton;
