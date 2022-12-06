import { FormEvent, useState } from 'react'
import { useCharacters } from '../context/useCharacters'

const SearchBar = () => {
  const { submitSearch } = useCharacters()
  const [searchInput, setSearchInput] = useState('')

  const submit = (event: FormEvent) => {
    event.preventDefault()
    submitSearch(searchInput)
  }

  return (
    <form onSubmit={submit}>
      <input type="text" placeholder="Search" className="bg-white border rounded p-3" value={searchInput} onChange={(event) => setSearchInput(event.target.value)} />
    </form>
  )
}

export default SearchBar
