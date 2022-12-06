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
  submitSearch: (text: string) => void
}>({
  characters: [],
  loading: true,
  error: '',
  page: 1,
  lastPage: 1,
  setPage: () => {},
  apiPage: undefined,
  submitSearch: () => {},
})

export const CharactersProvider = ({ children }: { children: ReactNode }) => {
  const [characters, setCharacters] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [apiPage, setApiPage] = useState<number | undefined>(undefined)
  const [search, setSearch] = useState('')

  const submitSearch = (text: string) => {
    setSearch(text)
    setPage(1)
    setApiPage(undefined)
    setCharacters([])
  }

  const fetchCharacters = async (nextPage: number) => {
    setLoading(true)

    let url = `https://rickandmortyapi.com/api/character/?page=${nextPage}`
    if (search) url += `&name=${search}`

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
  }, [page, search])

  return <charactersContext.Provider value={{ characters, loading, error, page, setPage, lastPage, submitSearch, apiPage }}>{children}</charactersContext.Provider>
}

export const useCharacters = () => {
  const context = useContext(charactersContext)
  if (context === undefined) throw Error('Context must be used within a provider!')
  else return context
}
