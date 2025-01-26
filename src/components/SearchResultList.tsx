import { Link } from 'react-router'
import type { Movie, Person, TVWithMediaType } from 'tmdb-ts'

type SearchResultListProps = {
  results: (Movie | TVWithMediaType | Person)[]
}

const SearchResultList: React.FC<SearchResultListProps> = ({ results }) => (
  <div className="space-y-6 w-5/6 mx-auto">
    {results.map(result => {
      const isMovie = (result as Movie).title !== undefined
      const isTV = (result as TVWithMediaType).name !== undefined
      const isPerson = (result as Person).known_for_department !== undefined

      return (
        <div key={result.id} className="flex space-x-4 text-left">
          <Link
            to={`/${isMovie ? 'movie' : isTV ? 'tv' : 'person'}/${result.id}`}
          >
            {isMovie || isTV ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${(result as Movie).poster_path || (result as TVWithMediaType).poster_path}`}
                alt={
                  isMovie
                    ? (result as Movie).title
                    : (result as TVWithMediaType).name
                }
                className="object-cover rounded-lg min-w-40 max-w-40 h-auto"
              />
            ) : isPerson && (result as Person).profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${(result as Person).profile_path}`}
                alt={(result as Person).name}
                className="object-cover rounded-lg min-w-40 max-w-40 h-auto"
              />
            ) : (
              <div className="w-full bg-gray-300 flex items-center justify-center aspect-[2/3]">
                <p className="text-gray-500">No Image Available</p>
              </div>
            )}
          </Link>
          <div className="flex flex-col">
            <Link
              to={`/${isMovie ? 'movie' : isTV ? 'tv' : 'person'}/${result.id}`}
              className="text-xl font-bold hover:underline"
            >
              {isMovie
                ? (result as Movie).title
                : isTV
                  ? (result as TVWithMediaType).name
                  : (result as Person).name}
            </Link>
            {isMovie && (
              <span className="text-sm">
                Release Date: {(result as Movie).release_date}
              </span>
            )}
            {isTV && (
              <span className="text-sm">
                First Air Date: {(result as TVWithMediaType).first_air_date}
              </span>
            )}
            {isPerson && (
              <span className="text-sm">
                Known For: {(result as Person).known_for_department}
              </span>
            )}
            <span className="text-sm">
              Popularity: {result.popularity.toFixed(1)}
            </span>
            <div className="flex-grow" />
            <div className="mt-auto text-sm text-gray-600">
              {isMovie
                ? (result as Movie).overview
                : isTV
                  ? (result as TVWithMediaType).overview
                  : ''}
            </div>
            <div className="flex-grow" />
          </div>
        </div>
      )
    })}
  </div>
)

export default SearchResultList
