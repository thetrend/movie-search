import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useRecentSearches } from '../contexts/RecentSearchesContext'

const HistoryPage: React.FC = () => {
  const context = useRecentSearches()
  const [history, setHistory] = useState<string[]>([])

  useEffect(() => {
    if (context) {
      setHistory([...new Set(context.recentSearches)])
    } else {
      const storedSearches = localStorage.getItem('recentSearches')
      if (storedSearches) {
        setHistory([...new Set(JSON.parse(storedSearches) as string[])])
      }
    }
  }, [context])

  const clearHistory = () => {
    if (context) {
      context.clearSearches()
    } else {
      localStorage.removeItem('recentSearches')
      setHistory([])
      window.dispatchEvent(new Event('storage'))
    }
  }

  return (
    <div className="bg-white bg-opacity-55 text-black p-10 rounded-lg mx-10 text-center">
      <h2 className="text-3xl font-bold text-center">Search History</h2>
      <ul className="list-disc text-left">
        {history.length > 0 ? (
          history.map(search => (
            <li key={search}>
              <Link to={`/search?q=${search}`}>{search}</Link>
            </li>
          ))
        ) : (
          <p>No recent searches found.</p>
        )}
      </ul>
      {history.length > 0 && (
        <button
          type="button"
          onClick={clearHistory}
          className="mt-20 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Clear All History
        </button>
      )}
    </div>
  )
}

export default HistoryPage
