import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageButtons = () => {
    const pageNumbers = [];

    if (totalPages <= 7) {
      // If we have 7 or fewer pages, show all of them
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);

      if (currentPage > 3) {
        pageNumbers.push("...");
      }

      // Add pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      if (currentPage < totalPages - 2) {
        pageNumbers.push("...");
      }

      // Always include last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers.map((pageNum, idx) => (
      <button
        key={idx}
        onClick={() =>
          typeof pageNum === "number" ? onPageChange(pageNum) : null
        }
        disabled={pageNum === "..."}
        className={`px-3 py-1 rounded-md ${
          pageNum === currentPage
            ? "bg-blue-600 text-white"
            : pageNum === "..."
            ? "cursor-default text-gray-500"
            : "border border-gray-300 hover:bg-gray-50 hover:text-gray-700"
        }`}
      >
        {pageNum}
      </button>
    ));
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:text-gray-700"
        aria-label="Previous page"
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>

      <div className="flex gap-2">{renderPageButtons()}</div>

      <div className="text-sm text-gray-600 mx-2">
        Page {currentPage} of {totalPages}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:text-gray-700"
        aria-label="Next page"
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Pagination;
