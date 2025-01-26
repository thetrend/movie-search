import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import type { ErrorResponse, MultiSearchResult } from 'tmdb-ts'
import ErrorMessage from '../components/ErrorMessage'
import LoadingIndicator from '../components/LoadingIndicator'
import Pagination from '../components/Pagination'
import SearchForm from '../components/SearchForm'
import SearchResultGrid from '../components/SearchResultGrid'
import SearchResultList from '../components/SearchResultList'
import SortControls from '../components/SortControls'
import ViewModeToggle from '../components/ViewModeToggle'
import { useRecentSearches } from '../contexts/RecentSearchesContext'
import tmdbClient from '../utils/tmdbClient'

const SearchPage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [query, setQuery] = useState<string>('')
  const [results, setResults] = useState<MultiSearchResult[]>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<ErrorResponse | null>(null)
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [sortCriteria, setSortCriteria] = useState<{
    key: string
    order: 'asc' | 'desc'
  }>({
    key: 'release_date',
    order: 'asc',
  })
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const { addSearch } = useRecentSearches()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const q = searchParams.get('q')
    if (q && q.length > 0) {
      setQuery(q)
      handleSearch(q, page)
    }
  }, [location.search, page])

  const handleSearch = async (
    searchQuery: string = query,
    searchPage: number = page,
  ) => {
    if (!searchQuery?.trim()) return
    addSearch(searchQuery)
    navigate(`/search?q=${searchQuery}`)
    setLoading(true)
    try {
      const response = await tmdbClient.search.multi({
        query: searchQuery,
        page: searchPage,
      })
      setResults(response.results as MultiSearchResult[])
      setTotalPages(response.total_pages)
    } catch (error) {
      setError(error as ErrorResponse)
    } finally {
      setLoading(false)
    }
  }

  const handleSort = (key: string, order: 'asc' | 'desc') => {
    const sortedResults = results?.sort((a, b) => {
      let valA: Date | number | string
      let valB: Date | number | string

      switch (key) {
        case 'release_date':
          valA =
            'release_date' in a
              ? new Date(a.release_date)
              : 'first_air_date' in a
                ? new Date(a.first_air_date)
                : new Date()
          valB =
            'release_date' in b
              ? new Date(b.release_date)
              : 'first_air_date' in b
                ? new Date(b.first_air_date)
                : new Date()
          break
        case 'popularity':
          valA = a.popularity
          valB = b.popularity
          break
        case 'title':
          valA = 'title' in a ? a.title.toLowerCase() : a.name.toLowerCase()
          valB = 'title' in b ? b.title.toLowerCase() : b.name.toLowerCase()
          break
        case 'name':
          valA = 'name' in a ? a.name.toLowerCase() : ''
          valB = 'name' in b ? b.name.toLowerCase() : ''
          break
        default:
          return 0
      }

      return order === 'asc' ? (valA > valB ? 1 : -1) : valA < valB ? 1 : -1
    })

    setSortCriteria({ key, order })
    setResults(sortedResults)
  }

  return (
    <div>
      <SearchForm
        query={query}
        setQuery={setQuery}
        handleSearch={e => {
          if (e) e.preventDefault()
          handleSearch()
        }}
      />
      {loading ? (
        <LoadingIndicator />
      ) : results && results.length > 0 ? (
        <>
          {results.some(result => result.media_type === 'movie') && (
            <div className="flex justify-between">
              <SortControls
                sortCriteria={sortCriteria}
                handleSort={handleSort}
              />
              <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
            </div>
          )}
          {results.some(result => result.media_type === 'movie') && (
            <div className="bg-white bg-opacity-55 text-black p-10 rounded-lg mx-10 text-center">
              <h3 className="text-lg font-bold mb-2">Movies</h3>
              {viewMode === 'grid' ? (
                <SearchResultGrid
                  results={results.filter(
                    result => result.media_type === 'movie',
                  )}
                />
              ) : (
                <SearchResultList
                  results={results.filter(
                    result => result.media_type === 'movie',
                  )}
                />
              )}
            </div>
          )}
          {results.some(result => result.media_type === 'tv') && (
            <div className="mt-4 bg-white bg-opacity-55 text-black p-10 rounded-lg mx-10 text-center">
              <h3 className="text-lg font-bold mb-2">TV Shows</h3>
              <SearchResultGrid
                results={results.filter(result => result.media_type === 'tv')}
              />
            </div>
          )}
          {results.some(result => result.media_type === 'person') && (
            <div className="mt-4 bg-white bg-opacity-55 text-black p-10 rounded-lg mx-10 text-center">
              <h3 className="text-lg font-bold mb-2">People</h3>
              <SearchResultGrid
                results={results.filter(
                  result => result.media_type === 'person',
                )}
              />
            </div>
          )}
        </>
      ) : (
        <p className="text-center w-full text-xl font-bold">
          No results found!
        </p>
      )}
      {error && (
        <ErrorMessage
          error={
            error.status_message || 'Something went wrong. Please try again.'
          }
        />
      )}
      {results && !error && (
        <Pagination
          page={page}
          totalPages={totalPages}
          handlePrevPage={() => setPage(page - 1)}
          handleNextPage={() => setPage(page + 1)}
        />
      )}
    </div>
  )
}

export default SearchPage
