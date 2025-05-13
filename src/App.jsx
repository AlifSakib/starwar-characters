import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCharacters } from "./hooks/useCharacters";
import SkeletonCard from "./components/SkeletonCard";
import CharacterCard from "./components/CharacterCard";
import CharacterDetails from "./components/CharacterDetails";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import "./App.css";

const queryClient = new QueryClient();

function StarWarsApp() {
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    characters,
    isLoading,
    error,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useCharacters(searchQuery);

  console.log("Characters:", characters);

  return (
    <div className="min-h-screen min-w-screen bg-gray-100 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
          Star Wars Characters
        </h1>

        <div className="flex justify-center mb-8">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        <div className="flex justify-start mb-4">
          {searchQuery && (
            <div className="text-center mb-4">
              Search results for:{" "}
              <span className="font-semibold text-gray-900 dark:text-red-500">
                {searchQuery}{" "}
              </span>
            </div>
          )}
        </div>

        {/* Loading and Error Handling */}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            Error loading characters
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {characters.map((character) => (
                <CharacterCard
                  key={character.uid}
                  character={character}
                  onClick={setSelectedCharacterId}
                />
              ))}
            </div>

            {!searchQuery && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}

        {selectedCharacterId && (
          <CharacterDetails
            characterId={selectedCharacterId}
            onClose={() => setSelectedCharacterId(null)}
          />
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StarWarsApp />
    </QueryClientProvider>
  );
}

export default App;
