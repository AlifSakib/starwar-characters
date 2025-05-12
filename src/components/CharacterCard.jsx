const CharacterCard = ({ character, onClick }) => {
  return (
    <div
      onClick={() => onClick(character.uid)}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer
                transform transition-all duration-200 hover:scale-105 hover:shadow-xl"
    >
      <div className="relative aspect-[3/4] bg-gray-200">
        <img
          src={`./src/assets/static/assets/img/people/${character.uid}.jpg`}
          alt={character.name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
          {character.name}
        </h3>
        {character.details && (
          <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
            <p>Birth Year: {character.details.birth_year}</p>
            <p>Gender: {character.details.gender}</p>
            <p>Height: {character.details.height}cm</p>
          </div>
        )}
        {character.films && character.films.length > 0 && (
          <div className="mt-3 space-y-2">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Appears in:
            </h4>
            <div className="space-y-1">
              {character.films.slice(0, 2).map((film) => (
                <div
                  key={film.episode}
                  className="text-xs bg-gray-100 dark:bg-gray-700 p-1.5 rounded"
                >
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {film.title}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Episode {film.episode} •{" "}
                    {new Date(film.release_date).getFullYear()}
                  </p>
                </div>
              ))}
              {character.films.length > 2 && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  +{character.films.length - 2} more films
                </p>
              )}
            </div>
          </div>
        )}
        <div className="mt-3">
          <span className="inline-block bg-yellow-500 text-white text-xs px-2 py-1 rounded">
            ID: {character.uid}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
