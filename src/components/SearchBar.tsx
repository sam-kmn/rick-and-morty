import useCharacters from '../utils/store'

const SearchBar = () => {
  const search = useCharacters((state) => state.search)
  const setSearch = useCharacters((state) => state.setSearch)

  return (
    <div className="flex-1 flex justify-between items-center bg-white border border-secondary-40 rounded-md p-3">
      <input type="text" placeholder="Search" value={search} onChange={(event) => setSearch(event.target.value)} className="flex-1  placeholder:text-primary-anthracite-50 focus:outline-none" />
      <button type="submit" className="bi bi-search text-secondary-100 hover:scale-125 transition duration-150"></button>
    </div>
  )
}

export default SearchBar
