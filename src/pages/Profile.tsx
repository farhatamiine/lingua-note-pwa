import { useAppBar } from "@/context/AppBarContext";
import { useEffect } from "react";

function ProfilePage() {
  const { setConfig } = useAppBar();

  useEffect(() => {
    setConfig({
      isBorderBottom: false,
      title: "Profile",
    });
  }, [setConfig]);

  return <div>ProfilePage</div>;
}

export default ProfilePage;
