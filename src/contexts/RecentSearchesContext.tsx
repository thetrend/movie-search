import { createContext, useContext, useEffect, useState } from 'react'

interface RecentSearchesContextProps {
  recentSearches: string[]
  addSearch: (search: string) => void
  clearSearches: () => void
}

const RecentSearchesContext = createContext<
  RecentSearchesContextProps | undefined
>(undefined)

export const RecentSearchesProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  useEffect(() => {
    const storedSearches = localStorage.getItem('recentSearches')
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches))
    }
  }, [])

  const addSearch = (search: string) => {
    const updatedSearches = [search, ...recentSearches].slice(0, 5)
    setRecentSearches(updatedSearches)
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches))
  }

  const clearSearches = () => {
    setRecentSearches([])
    localStorage.removeItem('recentSearches')
  }

  return (
    <RecentSearchesContext.Provider
      value={{ recentSearches, addSearch, clearSearches }}
    >
      {children}
    </RecentSearchesContext.Provider>
  )
}

export const useRecentSearches = () => {
  const context = useContext(RecentSearchesContext)
  if (!context) {
    throw new Error(
      'useRecentSearches must be used within a RecentSearchesProvider',
    )
  }
  return context
}
