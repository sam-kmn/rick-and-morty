import SelectSpecies from './components/SelectSpecies'
import Pagination from './components/Pagination'
import SearchBar from './components/SearchBar'
import Table from './components/Table'
import { useEffect } from 'react'
import useCharacters from './utils/store'

function App() {
  const page = useCharacters((state) => state.page)
  const apiPage = useCharacters((state) => state.apiPage)
  const search = useCharacters((state) => state.search)
  const species = useCharacters((state) => state.species)
  const resetStore = useCharacters((state) => state.resetStore)
  const fetchCharacters = useCharacters((state) => state.fetchCharacters)

  useEffect(() => resetStore(), [search, species])

  useEffect(() => {
    const nextPage = Math.ceil(page / 4)
    if (apiPage === undefined || nextPage !== apiPage) fetchCharacters(nextPage)
  }, [page, apiPage])

  return (
    <main className="w-full max-w-6xl mx-auto h-full flex flex-col py-20  justify-between ">
      <div className="w-full h-full flex flex-col gap-5 ">
        <h1 className="font-semibold text-2xl w-full text-start">Characters</h1>

        <div className="flex  max-w-sm gap-10">
          <SearchBar />
          <SelectSpecies />
        </div>

        <Table />
      </div>

      <Pagination />
    </main>
  )
}

export default App
