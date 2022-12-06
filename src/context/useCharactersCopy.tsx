import { useState, useEffect, createContext, ReactNode, useContext, SetStateAction, Dispatch, useMemo } from 'react'
import { Character } from '../interfaces'

const charactersContext = createContext<{
  characters: Character[]
  loading: boolean
  error: string
  page: number
  lastPage: number
  setPage: Dispatch<SetStateAction<number>>
  search: string
  setSearch: Dispatch<SetStateAction<string>>
  range: number[]
}>({
  characters: [],
  loading: true,
  error: '',
  page: 1,
  lastPage: 1,
  setPage: () => {},
  search: '',
  setSearch: () => {},
  range: [],
})

export const CharactersProvider = ({ children }: { children: ReactNode }) => {
  const [characters, setCharacters] = useState<any>([])

  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')
  const range = useMemo(() => Array.from({ length: 5 }, (_, i) => i + page * 5 - 5), [page])

  const fetchCharacters = async () => {
    setLoading(true)
    // const apiPage = Math.ceil(range[1] / 20)
    // console.log('fetch page:', apiPage)
    try {
      // const response = await fetch('https://rickandmortyapi.com/api/character/?page=' + apiPage)
      const response = await fetch('https://rickandmortyapi.com/api/character/')
      const data = await response.json()
      // setLastPage(Math.trunc(data.info.count / 5))
      // setCharacters([...characters, ...data.results])
      console.log('fetch', data)
    } catch (error) {
      setError(error as string)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    console.log(range)

    if (characters.length < range[4]) fetchCharacters()
    else console.log('all set')
    // const pool = characters.find((char: any) => range.includes(char.id))
    // console.log(range, pool)
    // if (pool) return console.log('characters already fetched')
    // fetchCharacters()
  }, [page, search])

  return <charactersContext.Provider value={{ characters, loading, error, page, setPage, lastPage, search, setSearch, range }}>{children}</charactersContext.Provider>
}

export const useCharacters = () => {
  const context = useContext(charactersContext)
  if (context === undefined) throw Error('Context must be used within a provider!')
  else return context
}
