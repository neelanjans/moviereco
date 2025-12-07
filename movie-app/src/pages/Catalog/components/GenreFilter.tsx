import { useGetGenresQuery } from "@/services/TMDB";

interface GenreFilterProps {
  category: string;
  selectedGenre: string;
  onGenreChange: (genreId: string) => void;
}

const GenreFilter = ({ category, selectedGenre, onGenreChange }: GenreFilterProps) => {
  const { data: genresData, isLoading } = useGetGenresQuery({ category });

  if (isLoading) {
    return (
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        <div className="h-8 w-16 bg-gray-700 animate-pulse rounded-full"></div>
        <div className="h-8 w-20 bg-gray-700 animate-pulse rounded-full"></div>
        <div className="h-8 w-24 bg-gray-700 animate-pulse rounded-full"></div>
      </div>
    );
  }

  const genres = genresData?.genres || [];

  return (
    <div className="mb-6">
      <h3 className="text-gray-200 font-nunito font-semibold mb-3 md:text-base sm:text-[15px] text-[14px]">
        Filter by Genre
      </h3>
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        <button
          onClick={() => onGenreChange("")}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
            selectedGenre === ""
              ? "bg-[#ff0000] text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          All
        </button>
        {genres.map((genre: { id: number; name: string }) => (
          <button
            key={genre.id}
            onClick={() => onGenreChange(String(genre.id))}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
              selectedGenre === String(genre.id)
                ? "bg-[#ff0000] text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;
