import { Link } from 'react-router'
import type { Movie, Person, TVWithMediaType } from 'tmdb-ts'

type SearchResultCardProps = {
  result: Movie | TVWithMediaType | Person
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({ result }) => {
  const isMovie = (result as Movie).title !== undefined
  const isTV = (result as TVWithMediaType).name !== undefined
  const isPerson = (result as Person).known_for_department !== undefined

  const imageUrl =
    (isMovie && (result as Movie).poster_path) ||
    (isTV && (result as TVWithMediaType).poster_path) ||
    (isPerson && (result as Person).profile_path) ||
    null

  if (!result || (!isMovie && !isTV && !isPerson)) {
    return null
  }

  return (
    <div className="flex flex-col items-center bg-white text-black text-center rounded-lg overflow-hidden mb-4 mx-4">
      {imageUrl ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${imageUrl}`}
          alt={
            isMovie
              ? (result as Movie).title
              : isTV
                ? (result as TVWithMediaType).name
                : (result as Person).name
          }
          className="w-full h-auto"
        />
      ) : (
        <div className="w-full aspect-[2/3] bg-gray-300 flex items-center justify-center">
          <p className="text-gray-500">No Image Available</p>
        </div>
      )}
      <div className="p-4">
        <p className="font-bold text-lg">
          <Link
            to={`/${isMovie ? 'movie' : isPerson ? 'person' : 'tv'}/${result.id}`}
          >
            {isMovie
              ? (result as Movie).title
              : isTV
                ? (result as TVWithMediaType).name
                : (result as Person).name}
          </Link>
        </p>
        {isMovie && (
          <p className="text-sm">
            Release Date: {(result as Movie).release_date || 'Unknown'}
          </p>
        )}
        {isTV && !isPerson && (
          <p className="text-sm">
            First Air Date:{' '}
            {(result as TVWithMediaType).first_air_date || 'Unknown'}
          </p>
        )}
        {isPerson && (
          <p className="text-sm">
            Known For: {(result as Person).known_for_department || 'Unknown'}
          </p>
        )}
      </div>
    </div>
  )
}

export default SearchResultCard
