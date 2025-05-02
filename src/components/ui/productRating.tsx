import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

export default function ProductRating({
  rating,
}: {
  rating: {
    rate: number;
    count: number;
  }
}) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              i < Math.round(rating.rate)
                ? "fill-chart-4 text-chart-4"
                : "fill-none text-muted-foreground"
            )}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">({rating.count})</span>
    </div>
  );
}
