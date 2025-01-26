interface SortControlsProps {
  sortCriteria: { key: string; order: 'asc' | 'desc' }
  handleSort: (key: string, order: 'asc' | 'desc') => void
}

const SortControls: React.FC<SortControlsProps> = ({
  sortCriteria,
  handleSort,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [key, order] = e.target.value.split('-')
    handleSort(key, order as 'asc' | 'desc')
  }

  return (
    <div className="mb-4">
      <label htmlFor="sort" className="mr-2">
        Sort by:
      </label>
      <select
        id="sort"
        value={`${sortCriteria.key}-${sortCriteria.order}`}
        onChange={handleChange}
      >
        <option value="release_date-asc">Release Date (Ascending)</option>
        <option value="release_date-desc">Release Date (Descending)</option>
        <option value="popularity-asc">Popularity (Ascending)</option>
        <option value="popularity-desc">Popularity (Descending)</option>
        <option value="title-asc">Title (A-Z)</option>
        <option value="title-desc">Title (Z-A)</option>
        <option value="name-asc">Name (A-Z)</option>
        <option value="name-desc">Name (Z-A)</option>
      </select>
    </div>
  )
}

export default SortControls
