import { Route, BrowserRouter as Router, Routes } from 'react-router'
import Layout from './components/Layout'
import { RecentSearchesProvider } from './contexts/RecentSearchesContext'
import AboutPage from './pages/AboutPage'
import DetailsPage from './pages/DetailsPage'
import HistoryPage from './pages/HistoryPage'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'

const App: React.FC = () => {
  return (
    <RecentSearchesProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/:type/:id" element={<DetailsPage />} />
          </Routes>
        </Layout>
      </Router>
    </RecentSearchesProvider>
  )
}

export default App
