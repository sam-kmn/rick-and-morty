import { useCharacters } from '../context/useCharacters'

const PaginationButton = ({ to }: { to: number }) => {
  const { page, setPage, lastPage } = useCharacters()
  if (to > lastPage || to < 1) return null
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

  if (lastPage < 4)
    return (
      <div className="flex items-center justify-end gap-1">
        {[...Array(3).keys()].map((i: number) => <PaginationButton to={i + 1} />)}
      </div>
    )
    
  if (page < 3 || page > lastPage - 3)
    return (
      <div className="flex items-center justify-end gap-1">
        <button onClick={decreasePage} className="pagination-button bi bi-chevron-left"></button>

        {[...Array(3).keys()].map((i: number) => <PaginationButton to={i + 1} />)}

        <div className="m-3">...</div>

        {[...Array(3).keys()].map((i: number) => <PaginationButton to={lastPage + i - 2} />)}

        <button onClick={increasePage} className="pagination-button bi bi-chevron-right"></button>
      </div>
    )
  else
    return (
      <div className="flex items-center justify-end gap-1">
        <button onClick={decreasePage} className="pagination-button bi bi-chevron-left"></button>
        <button onClick={() => setPage(1)} className="pagination-button">1</button>

        <div className="m-3">...</div>

        {page > 3 && <PaginationButton to={page - 2} />}
        <PaginationButton to={page - 1} />
        <PaginationButton to={page} />
        <PaginationButton to={page + 1} />
        <PaginationButton to={page + 2} />

        <div className="m-3">...</div>

        <button onClick={() => setPage(lastPage)} className="pagination-button">{lastPage}</button>
        <button onClick={increasePage} className="pagination-button bi bi-chevron-right"></button>
      </div>
    )
}

export default Pagination
