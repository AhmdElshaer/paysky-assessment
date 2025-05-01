import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ProductSkeleton() {
  return (
    <Card className="h-full w-full overflow-hidden">
      <div className="relative">
        <Skeleton className="h-[200px] w-full" />
        <div className="absolute left-2 top-2">
          <Skeleton className="h-5 w-20" />
        </div>
      </div>
      <CardContent className="p-4">
        <Skeleton className="h-5 w-full" />
        <div className="mt-2 flex items-center gap-1">
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-8 w-20" />
        </div>
      </CardContent>
    </Card>
  );
}