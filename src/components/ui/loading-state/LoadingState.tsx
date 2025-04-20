
import React from "react";

export function LoadingState() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="space-y-4 w-full max-w-sm">
        <div className="h-4 bg-muted rounded animate-pulse" />
        <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
        <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
      </div>
    </div>
  );
}
