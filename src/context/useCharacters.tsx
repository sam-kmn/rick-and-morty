import { useState, useEffect, createContext, ReactNode, useContext, SetStateAction, Dispatch, useMemo } from 'react'
import { Character } from '../interfaces'

const charactersContext = createContext<{
  characters: any[]
  loading: boolean
  error: string
  page: number
  lastPage: number
  setPage: Dispatch<SetStateAction<number>>
  apiPage: number | undefined
  search: string
  setSearch: Dispatch<SetStateAction<string>>
}>({
  characters: [],
  loading: true,
  error: '',
  page: 1,
  lastPage: 1,
  setPage: () => {},
  apiPage: undefined,
  search: '',
  setSearch: () => {},
})

export const CharactersProvider = ({ children }: { children: ReactNode }) => {
  const [characters, setCharacters] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)

  const [apiPage, setApiPage] = useState<number | undefined>(undefined)

  const [search, setSearch] = useState('')

  const splitToChunks = (data: Character[], chunkSize = 5) => {
    const chunks = []
    for (let i = 0; i < data.length; i += chunkSize) {
      const chunk = data.slice(i, i + chunkSize)
      chunks.push(chunk)
    }
    return chunks
  }

  const fetchCharacters = async (nextPage: number) => {
    console.log('fetch')
    setLoading(true)

    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${nextPage}`)
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
    if (apiPage === undefined || nextPage > apiPage) fetchCharacters(nextPage)
  }, [page])

  return <charactersContext.Provider value={{ characters, loading, error, page, setPage, lastPage, search, setSearch, apiPage }}>{children}</charactersContext.Provider>
}

export const useCharacters = () => {
  const context = useContext(charactersContext)
  if (context === undefined) throw Error('Context must be used within a provider!')
  else return context
}
