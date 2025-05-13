import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative max-w-md w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search characters..."
        className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-700 
                   rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                   focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full 
                     hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Clear search"
        >
          <XMarkIcon className="h-4 w-4 text-gray-500" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
