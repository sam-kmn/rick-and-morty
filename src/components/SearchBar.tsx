import { FormEvent, useState } from 'react'
import { useCharacters } from '../context/useCharacters'

const SearchBar = () => {
  const { search, setSearch } = useCharacters()

  return (
    <div className="flex-1 flex justify-between items-center bg-white border rounded p-3">
      <input type="text" placeholder="Search" value={search} onChange={(event) => setSearch(event.target.value)} className="flex-1 focus:outline-none" />
      <button type="submit" className="bi bi-search text-blue-500 hover:scale-125 transition duration-150"></button>
    </div>
  )
}

export default SearchBar
