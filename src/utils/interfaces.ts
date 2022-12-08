import { SetStateAction, Dispatch } from 'react'
import { allSpecies } from '../components/SelectSpecies'

export interface Character {
  id: number
  name: string
  species: typeof allSpecies[number]
  status: 'Alive' | 'Dead' | 'unknown'
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown'
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episode: string[]
  url: string
  created: string
}

export interface CharacterStore {
  characters: any[]
  loading: boolean
  error: string
  page: number
  lastPage: number
  search: string
  species: string
  apiPage: number | undefined
  resetStore: () => void
  setPage: (payload: number) => void
  setSearch: (payload: string) => void
  setSpecies: (payload: typeof allSpecies[number]) => void
  fetchCharacters: (payload: number) => void
}
