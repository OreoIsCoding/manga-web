import React from 'react';

export const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-700 rounded ${className}`} />
);

export const MangaCardSkeleton = () => (
  <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
    <Skeleton className="w-full aspect-[2/3]" />
    <div className="p-4">
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  </div>
);

export const MangaDetailsSkeleton = () => (
  <div className="bg-gray-800 rounded-lg shadow-xl p-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <Skeleton className="w-full aspect-[2/3] rounded-lg" />
      </div>
      <div className="md:col-span-2 space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="pt-8 mt-8 border-t border-gray-700">
          <Skeleton className="h-6 w-48 mb-4" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Skeleton className="h-12 rounded-lg" />
            <Skeleton className="h-12 rounded-lg" />
            <Skeleton className="h-12 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  </div>
);
