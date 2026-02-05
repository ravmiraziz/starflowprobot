import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6 mb-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="size-8 rounded-lg glass-card flex items-center justify-center text-white/60 disabled:opacity-30 disabled:cursor-not-allowed hover:text-white transition-colors"
      >
        <MdChevronLeft className="text-xl" />
      </button>

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`size-8 rounded-lg flex items-center justify-center text-xs font-black transition-all ${
            currentPage === page
              ? "bg-primary text-black scale-110 shadow-[0_0_12px_rgba(242,185,13,0.3)]"
              : "glass-card text-white/60 hover:text-white"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="size-8 rounded-lg glass-card flex items-center justify-center text-white/60 disabled:opacity-30 disabled:cursor-not-allowed hover:text-white transition-colors"
      >
        <MdChevronRight className="text-xl" />
      </button>
    </div>
  );
};

export default Pagination;
