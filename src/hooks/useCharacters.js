import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchCharacters,
  fetchCharacterDetails,
  searchCharacters,
} from "../services/api";

export const useCharacters = (searchQuery = "") => {
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  // Update debounced value after 300ms of no changes
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const charactersQuery = useQuery({
    queryKey: ["characters", currentPage, debouncedSearchQuery],
    queryFn: () =>
      debouncedSearchQuery
        ? searchCharacters(debouncedSearchQuery)
        : fetchCharacters(currentPage),
    keepPreviousData: true,
  });

  let characters = [];
  if (charactersQuery.isSuccess) {
    if (debouncedSearchQuery) {
      characters = charactersQuery.data.result.map((character) => ({
        name: character.properties.name,
        uid: character.uid,
      }));
    } else {
      characters = charactersQuery.data.results || [];
    }
  }

  return {
    characters,
    isLoading: charactersQuery.isLoading,
    error: charactersQuery.error,
    currentPage,
    setCurrentPage,
    hasMore: charactersQuery.data?.next !== null,
    totalPages: Math.ceil((charactersQuery.data?.total_records || 0) / 10),
  };
};

export const useCharacterDetails = (characterId) => {
  return useQuery({
    queryKey: ["character", characterId],
    queryFn: () => fetchCharacterDetails(characterId),
    enabled: !!characterId,
  });
};
