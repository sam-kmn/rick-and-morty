import { useState, useEffect, createContext, ReactNode, useContext } from 'react'
import { secureFetch, splitToChunks } from '../utils/helpers'
import { CharactersContext } from '../utils/interfaces'

const charactersContext = createContext<CharactersContext>({
  characters: [],
  loading: true,
  error: '',
  page: 1,
  lastPage: 1,
  search: '',
  species: '',
  apiPage: undefined,
  setPage: () => {},
  setSearch: () => {},
  setSpecies: () => {},
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
    setError('')
  }

  const fetchCharacters = async (nextPage: number) => {
    setLoading(true)

    let url = `https://rickandmortyapi.com/api/character/?page=${nextPage}`
    if (search) url += `&name=${search}`
    if (species) url += `&species=${species}`

    const [data, err] = await secureFetch(url)

    if (err) setError(err)
    else {
      const chunks = splitToChunks(data.results)
      setCharacters(chunks)
      setLastPage(Math.ceil(data.info.count / 5))
    }
    setApiPage(nextPage)
    setLoading(false)
  }

  useEffect(() => resetState(), [search, species])

  useEffect(() => {
    const nextPage = Math.ceil(page / 4)
    if (apiPage === undefined || nextPage !== apiPage) fetchCharacters(nextPage)
  }, [page, apiPage])

  const providerValues = { characters, loading, error, page, setPage, lastPage, apiPage, search, setSearch, species, setSpecies }

  return <charactersContext.Provider value={providerValues}>{children}</charactersContext.Provider>
}

export const useCharacters = () => {
  const context = useContext(charactersContext)
  if (context === undefined) throw Error('Context must be used within a provider!')
  else return context
}
