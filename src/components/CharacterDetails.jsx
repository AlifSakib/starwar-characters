import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCharacterDetails } from "../hooks/useCharacters";

const CharacterDetails = ({ characterId, onClose }) => {
  const { data: character, isLoading } = useCharacterDetails(characterId);

  if (!characterId) return null;

  return (
    <div className="relative z-10">
      <div className="fixed inset-0 bg-gray-500/75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              {isLoading ? (
                <div className="text-center py-4 text-gray-700">
                  Loading...
                  <div className="absolute top-4 right-4 cursor-pointer">
                    <button onClick={onClose}>
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              ) : character ? (
                <div className="space-y-6">
                  {/* Character Image */}
                  <div className="relative w-full h-64  ">
                    <img
                      src={`./src/assets/static/assets/img/people/${characterId}.jpg`}
                      alt={character.name}
                      className="w-full h-full object-cover relative rounded-lg shadow-lg"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/400x400?text=No+Image";
                      }}
                    />
                  </div>

                  {/* Character Info */}
                  <div className="px-2">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {character.name}
                    </h3>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <p>
                          <span className="font-semibold text-gray-700">
                            Birth Year:
                          </span>{" "}
                          <span className="text-gray-600">
                            {character.birth_year}
                          </span>
                        </p>
                        <p>
                          <span className="font-semibold text-gray-700">
                            Height:
                          </span>{" "}
                          <span className="text-gray-600">
                            {character.height}cm
                          </span>
                        </p>
                        <p>
                          <span className="font-semibold text-gray-700">
                            Mass:
                          </span>{" "}
                          <span className="text-gray-600">
                            {character.mass}kg
                          </span>
                        </p>
                        <p>
                          <span className="font-semibold text-gray-700">
                            Gender:
                          </span>{" "}
                          <span className="text-gray-600">
                            {character.gender}
                          </span>
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p>
                          <span className="font-semibold text-gray-700">
                            Hair Color:
                          </span>{" "}
                          <span className="text-gray-600">
                            {character.hair_color}
                          </span>
                        </p>
                        <p>
                          <span className="font-semibold text-gray-700">
                            Eye Color:
                          </span>{" "}
                          <span className="text-gray-600">
                            {character.eye_color}
                          </span>
                        </p>
                        <p>
                          <span className="font-semibold text-gray-700">
                            Skin Color:
                          </span>{" "}
                          <span className="text-gray-600">
                            {character.skin_color}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Films Section */}
                    <div className="mt-6 ">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Appears in:
                      </h4>
                      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
                        {character.films?.map((film) => (
                          <div
                            key={film.episode}
                            className="bg-gray-50 p-2 rounded"
                          >
                            <p className="font-medium text-gray-900">
                              {film.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              Episode {film.episode} • Released{" "}
                              {new Date(film.release_date).getFullYear()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <button onClick={onClose}>
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-red-500">
                  Error loading character details
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
