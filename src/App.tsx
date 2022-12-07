import SelectSpecies from './components/SelectSpecies'
import Pagination from './components/Pagination'
import SearchBar from './components/SearchBar'
import Table from './components/Table'

function App() {
  return (
    <main className="w-full max-w-6xl mx-auto h-full flex flex-col py-20  justify-between ">
      <div className="w-full flex flex-col gap-5 ">
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
