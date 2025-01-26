import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type SearchFormProps = {
  query: string
  setQuery: React.Dispatch<React.SetStateAction<string>>
  handleSearch: (e?: React.FormEvent<HTMLFormElement>) => void
}

const SearchForm: React.FC<SearchFormProps> = ({
  query,
  setQuery,
  handleSearch,
}) => (
  <form
    onSubmit={handleSearch}
    className="flex flex-col place-items-center w-full gap-2 mb-6 mx-2 md:mx-10 xl:mx-0 my-10 pb-20"
  >
    <h2 className="text-4xl font-bold">Movie Search</h2>
    <p className="p-10 text-center">
      Search for a movie, TV show, cast member, or crew member!
    </p>
    <div className="flex w-5/6">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search for something!"
        className="border p-2 rounded-lg mr-2 flex flex-grow"
      />
      <button
        type="submit"
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
      >
        <FontAwesomeIcon
          icon={['fas', 'magnifying-glass']}
          className="md:hidden"
        />
        <span className="hidden md:block">
          <FontAwesomeIcon
            icon={['fas', 'magnifying-glass']}
            className="mr-2"
          />
          Search
        </span>
      </button>
    </div>
  </form>
)

export default SearchForm
