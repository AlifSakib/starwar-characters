import React from "react";

const SkeletonCard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>

      {/* Name skeleton */}
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>

      {/* Details skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
