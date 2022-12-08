import create from 'zustand'
import { secureFetch, splitToChunks } from './helpers'
import { CharacterStore } from './interfaces'

const useCharacters = create<CharacterStore>((set, get) => ({
  characters: [],
  loading: true,
  error: '',
  page: 1,
  lastPage: 1,
  search: '',
  species: '',
  apiPage: undefined,
  setPage: (payload) => set({ page: payload }),
  setSearch: (payload) => set({ search: payload }),
  setSpecies: (payload) => set({ species: payload }),
  resetStore: () =>
    set({
      page: 1,
      apiPage: undefined,
      characters: [],
      error: '',
    }),
  fetchCharacters: async (nextPage: number) => {
    set({ loading: true })

    let url = `https://rickandmortyapi.com/api/character/?page=${nextPage}`
    if (get().search) url += `&name=${get().search}`
    if (get().species) url += `&species=${get().species}`

    const [data, err] = await secureFetch(url)

    if (err) set({ error: err })
    else {
      const chunks = splitToChunks(data.results)
      set({
        characters: chunks,
        lastPage: Math.ceil(data.info.count / 5),
      })
    }
    set({
      apiPage: nextPage,
      loading: false,
    })
  },
}))

export default useCharacters
