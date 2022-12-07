import Pagination from './components/Pagination'
import SearchBar from './components/SearchBar'
import SelectSpecies from './components/SelectSpecies'
import Table from './components/Table'

function App() {
  return (
    <main className="w-full max-w-6xl mx-auto h-full flex flex-col gap-5 justify-center ">
      <h1 className="font-semibold text-xl w-full text-start">Characters</h1>

      <div className="flex  max-w-sm gap-10">
        <SearchBar />
        <SelectSpecies />
      </div>
      <Table />
      <Pagination />
    </main>
  )
}

export default App
