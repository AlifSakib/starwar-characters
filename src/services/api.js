import axios from "axios";

const BASE_URL = "https://www.swapi.tech/api";

export const fetchCharacters = async (page = 1) => {
  const response = await axios.get(`${BASE_URL}/people?page=${page}&limit=10`);

  const films = await fetchFilms();

  // Fetch details for each character
  const charactersWithDetails = await Promise.all(
    response.data.results.map(async (character) => {
      try {
        const detailsResponse = await axios.get(character.url);
        const details = detailsResponse.data.result.properties;

        // Find films where this character appears
        const appearsIn = films
          .filter((film) =>
            film.properties.characters.includes(
              `${BASE_URL}/people/${character.uid}`
            )
          )
          .map((film) => ({
            title: film.properties.title,
            episode: film.properties.episode_id,
            release_date: film.properties.release_date,
          }))
          .sort((a, b) => a.episode - b.episode);

        return {
          ...character,
          details,
          films: appearsIn,
        };
      } catch (error) {
        console.error(
          `Error fetching details for character ${character.name}:`,
          error
        );
        return character;
      }
    })
  );

  return {
    ...response.data,
    results: charactersWithDetails,
  };
};

export const fetchFilms = async () => {
  const response = await axios.get(`${BASE_URL}/films`);
  return response.data.result;
};

export const fetchCharacterDetails = async (id) => {
  const [characterResponse, filmsResponse] = await Promise.all([
    axios.get(`${BASE_URL}/people/${id}`),
    fetchFilms(),
  ]);

  const characterDetails = characterResponse.data.result.properties;
  const films = filmsResponse;

  // Find films where this character appears
  const appearsIn = films
    .filter((film) =>
      film.properties.characters.includes(`${BASE_URL}/people/${id}`)
    )
    .map((film) => ({
      title: film.properties.title,
      episode: film.properties.episode_id,
      release_date: film.properties.release_date,
    }));

  return {
    ...characterDetails,
    films: appearsIn.sort((a, b) => a.episode - b.episode),
  };
};

export const searchCharacters = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/people?name=${query}`);
    return response.data;
  } catch (error) {
    console.error("Error searching characters:", error);
    return { results: [] };
  }
};
