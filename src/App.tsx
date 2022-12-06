import { FormEvent, useState } from 'react'
import Pagination from './components/Pagination'
import Table from './components/Table'
import { useCharacters } from './context/useCharacters'

function App() {
  const { submitSearch } = useCharacters()
  const [searchInput, setSearchInput] = useState('')
  const submit = (event: FormEvent) => {
    event.preventDefault()
    console.log(searchInput)
    submitSearch(searchInput)
  }

  return (
    <main className="w-full max-w-5xl mx-auto h-full flex flex-col gap-5 justify-center ">
      <h1 className="font-semibold text-xl w-full text-start">Characters</h1>

      <div className="flex gap-10">
        <form onSubmit={submit}>
          <input type="text" placeholder="Search" className="bg-white border rounded p-3" value={searchInput} onChange={(event) => setSearchInput(event.target.value)} />
        </form>
        <select name="" id="" className="bg-white border rounded p-3">
          <option value="">Human</option>
        </select>
      </div>
      <Table />
      <Pagination />
    </main>
  )
}

export default App
