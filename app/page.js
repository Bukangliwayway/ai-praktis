import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <UserButton />
      <Button> Eyyy </Button>
    </div>
  );
}
