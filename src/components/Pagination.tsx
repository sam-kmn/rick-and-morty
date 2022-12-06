import { useCharacters } from '../context/useCharacters'

const PaginationButton = ({ to }: { to: number }) => {
  const { page, setPage } = useCharacters()
  return (
    <button onClick={() => setPage(to)} className={(to === page ? '!bg-gray-200' : '') + ' pagination-button'}>
      {to}
    </button>
  )
}

const Pagination = () => {
  const { page, setPage, lastPage } = useCharacters()
  const increasePage = () => page < lastPage && setPage(page + 1)
  const decreasePage = () => page > 1 && setPage(page - 1)

  if (page < 3)
    return (
      <div className="flex items-center justify-end gap-1">
        <div className="mr-10">Page: {page}</div>

        <button onClick={decreasePage} className="pagination-button">
          -
        </button>

        <PaginationButton to={1} />
        <PaginationButton to={2} />
        <PaginationButton to={3} />

        <div className="m-3">...</div>

        <PaginationButton to={lastPage - 2} />
        <PaginationButton to={lastPage - 1} />
        <PaginationButton to={lastPage} />

        <button onClick={increasePage} className="pagination-button">
          +
        </button>
      </div>
    )
  else
    return (
      <div className="flex items-center justify-end gap-1">
        <div>Page: {page}</div>

        <button onClick={decreasePage} className="pagination-button">
          -
        </button>
        <button onClick={() => setPage(1)} className="pagination-button">
          1
        </button>

        <div className="m-3">...</div>

        {page > 3 && <PaginationButton to={page - 2} />}
        <PaginationButton to={page - 1} />
        <PaginationButton to={page} />
        <PaginationButton to={page + 1} />
        <PaginationButton to={page + 2} />

        <div className="m-3">...</div>

        <button onClick={() => setPage(lastPage)} className="pagination-button">
          {lastPage}
        </button>
        <button onClick={increasePage} className="pagination-button">
          +
        </button>
      </div>
    )
}

export default Pagination
