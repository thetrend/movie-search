import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import logo from './assets/moviesearch.svg'

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [results, setResults] = useState()
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      // const data =
      // setResults(data)
      console.log(query)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="flex flex-col justify-between items-center min-h-screen">
      <nav className="xl:container mx-auto flex justify-between align-center py-3 w-screen">
        <figure className="flex justify-between items-center">
          <img src={logo} className="w-16 h-16" alt="Movie Search" />
          <figcaption className="hidden md:inline">
            <span>Movie Search</span>
          </figcaption>
        </figure>
        <button type="button" className="md:hidden mr-4">
          <FontAwesomeIcon icon={['fas', 'bars']} />
        </button>
        <ul className="hidden list-none md:flex justify-between items-center">
          <span className="px-4">About</span>
          <span className="px-4">History</span>
          <span className="px-4">Upcoming</span>
        </ul>
      </nav>
      {/* HERO SECTION */}
      <main className="flex flex-col flex-grow container px-2">
        <div className="flex flex-col justify-center items-center md:p-36 p-4 border-[1px] border-black w-full">
          <h1 className="text-3xl font-bold">Movie Search</h1>
          <p>
            Search, filter, and explore detailed movie info, cast, reviews, and
            more.
          </p>
          <form
            onSubmit={e => handleSearch(e)}
            className="w-full md:w-11/12 flex py-6"
          >
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <input
              type="text"
              name="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="
          w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 
          focus:ring-black focus:border-black"
            />
            <button
              type="submit"
              aria-label="Submit search"
              className="ml-4 px-4 py-2 font-medium rounded-md bg-black text-white"
            >
              <FontAwesomeIcon icon={['fas', 'magnifying-glass']} />
            </button>
          </form>
        </div>
      </main>
      <footer className="pb-[2vh]">
        <p>&copy; 2025, Movie Search.</p>
      </footer>
    </div>
  )
}

export default App
