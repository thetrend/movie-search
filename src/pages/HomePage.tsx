import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import type { ErrorResponse, Movie } from 'tmdb-ts'
import ErrorMessage from '../components/ErrorMessage'
import LoadingIndicator from '../components/LoadingIndicator'
import SearchForm from '../components/SearchForm'
import MovieGrid from '../components/SearchResultGrid'
import tmdbClient from '../utils/tmdbClient'

const debounce = (func: (...args: unknown[]) => void, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>
  return (...args: unknown[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

const HomePage: React.FC = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<ErrorResponse | null>(null)
  const [query, setQuery] = useState<string>('')
  const [numResults, setNumResults] = useState<number>(5)
  const navigate = useNavigate()

  useEffect(() => {
    const updateNumResults = () => {
      if (window.innerWidth < 768) {
        setNumResults(4)
      } else if (window.innerWidth < 1024) {
        setNumResults(3)
      } else if (window.innerWidth < 1280) {
        setNumResults(4)
      } else {
        setNumResults(5)
      }
    }

    const debouncedUpdate = debounce(updateNumResults, 100)
    updateNumResults()
    window.addEventListener('resize', debouncedUpdate)

    return () => {
      window.removeEventListener('resize', debouncedUpdate)
    }
  }, [])

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setLoading(true)
      try {
        const response = await tmdbClient.movies.upcoming()
        setTrendingMovies(response.results.slice(0, numResults))
      } catch (error) {
        setError(error as ErrorResponse)
      } finally {
        setLoading(false)
      }
    }

    fetchTrendingMovies()
  }, [numResults])

  const handleSearch = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault()
    if (!query.trim()) return
    navigate(`/search?q=${query}`)
  }

  return (
    <div>
      <SearchForm
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
      />
      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <ErrorMessage
          error={
            error.status_message || 'Something went wrong. Please try again.'
          }
        />
      ) : (
        <>
          <h3 className="w-full text-center text-3xl font-bold pb-6">
            Trending Movies
          </h3>
          <MovieGrid results={trendingMovies.slice(0, numResults)} />
        </>
      )}
    </div>
  )
}

export default HomePage
