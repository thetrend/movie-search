import type { Movie, Person, TVWithMediaType } from 'tmdb-ts'
import SearchResultCard from './SearchResultCard'

type SearchResultGridProps = {
  results: (Movie | TVWithMediaType | Person)[]
}

const SearchResultGrid: React.FC<SearchResultGridProps> = ({ results }) => (
  <div className="grid gap-4 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
    {results.map(result => (
      <SearchResultCard key={result.id} result={result} />
    ))}
  </div>
)

export default SearchResultGrid
