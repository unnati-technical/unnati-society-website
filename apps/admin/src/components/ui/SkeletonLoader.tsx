import React from 'react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted/50 bg-gray-200", className)}
      {...props}
    />
  );
};

export const TableSkeleton = ({ columns = 5, rows = 5 }) => {
  return (
    <div className="w-full">
      <div className="flex items-center space-x-4 py-4">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-8 w-[100px] ml-auto" />
      </div>
      <div className="rounded-md border">
        <div className="border-b bg-gray-50/50 p-4 flex gap-4">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="p-4 flex gap-4 border-b">
            {Array.from({ length: columns }).map((_, j) => (
              <Skeleton key={j} className="h-4 w-full" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
