type PaginationProps = {
  page: number
  totalPages: number
  handlePrevPage: () => void
  handleNextPage: () => void
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  handlePrevPage,
  handleNextPage,
}) => (
  <div className="flex justify-between mt-8">
    <button
      type="button"
      disabled={page === 1}
      onClick={handlePrevPage}
      className={`px-4 py-2 bg-gray-300 rounded-lg ${page === 1 ? 'hidden' : 'hover:bg-gray-400'}`}
    >
      Previous
    </button>
    <button
      type="button"
      disabled={page === totalPages}
      onClick={handleNextPage}
      className={`px-4 py-2 bg-gray-300 rounded-lg ${page === totalPages ? 'hidden' : 'hover:bg-gray-400'}`}
    >
      Next
    </button>
  </div>
)

export default Pagination
