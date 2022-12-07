import { SetStateAction, Dispatch } from 'react'
import { allSpecies } from '../components/SelectSpecies'

export interface Character {
  id: number
  name: string
  species: keyof typeof allSpecies
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

export interface CharactersContext {
  characters: any[]
  loading: boolean
  error: string
  page: number
  lastPage: number
  search: string
  species: string
  apiPage: number | undefined
  setPage: Dispatch<SetStateAction<number>>
  setSearch: (payload: string) => void
  setSpecies: (payload: string) => void
}
