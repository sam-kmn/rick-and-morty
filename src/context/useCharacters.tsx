import { useState, useEffect, createContext, ReactNode, useContext, SetStateAction, Dispatch } from 'react'
import splitToChunks from '../utils/splitToChunks'

const charactersContext = createContext<{
  characters: any[]
  loading: boolean
  error: string
  page: number
  lastPage: number
  setPage: Dispatch<SetStateAction<number>>
  apiPage: number | undefined
  submitSearch: (payload: string) => void
  species: string
  submitSpecies: (payload: string) => void
}>({
  characters: [],
  loading: true,
  error: '',
  page: 1,
  lastPage: 1,
  setPage: () => {},
  apiPage: undefined,
  submitSearch: () => {},
  species: 'human',
  submitSpecies: () => {},
})

export const CharactersProvider = ({ children }: { children: ReactNode }) => {
  const [characters, setCharacters] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [apiPage, setApiPage] = useState<number | undefined>(undefined)
  const [search, setSearch] = useState('')
  const [species, setSpecies] = useState('')

  const resetState = () => {
    setPage(1)
    setApiPage(undefined)
    setCharacters([])
  }

  const submitSearch = (payload: string) => {
    setSearch(payload)
    setSpecies('')
    resetState()
  }

  const submitSpecies = (payload: string) => {
    setSpecies(payload)
    resetState()
  }

  const fetchCharacters = async (nextPage: number) => {
    setLoading(true)

    let url = `https://rickandmortyapi.com/api/character/?page=${nextPage}`
    if (search) url += `&name=${search}`
    else if (species) url += `&species=${species}`

    try {
      const response = await fetch(url)
      const data = await response.json()
      const chunks = splitToChunks(data.results)
      setCharacters(chunks)
      setLastPage(Math.trunc(data.info.count / 5))
      setApiPage(nextPage)
      //
    } catch (error) {
      setError(error as string)
      //
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const nextPage = Math.ceil(page / 4)
    if (apiPage === undefined || nextPage !== apiPage) fetchCharacters(nextPage)
  }, [page, search, species])

  return <charactersContext.Provider value={{ characters, loading, error, page, setPage, lastPage, submitSearch, apiPage, species, submitSpecies }}>{children}</charactersContext.Provider>
}

export const useCharacters = () => {
  const context = useContext(charactersContext)
  if (context === undefined) throw Error('Context must be used within a provider!')
  else return context
}
