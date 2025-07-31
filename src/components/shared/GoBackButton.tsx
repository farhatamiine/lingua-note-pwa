import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

function GoBackButton({ route }: { route: string }) {
  const navigate = useNavigate();

  return (
    <Button variant={"link"} onClick={() => navigate(route)}>
      <ArrowLeft />
    </Button>
  );
}

export default GoBackButton;
