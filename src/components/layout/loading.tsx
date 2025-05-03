import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <Loader2
        height={50}
        width={50}
        className="animate-spin text-muted-foreground"
      />
      <span>Loading...</span>
    </div>
  );
}
