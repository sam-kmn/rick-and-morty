import useCharacters from '../utils/store'

export const allSpecies = ['Alien', 'Human', 'Robot', 'Animal', 'Disease', 'Humanoid', 'Cronenberg', 'Poopybutthole', 'Mythological Creature', 'unknown']

const SelectSpecies = () => {
  const species = useCharacters((state) => state.species)
  const setSpecies = useCharacters((state) => state.setSpecies)

  return (
    <select value={species} onChange={(e) => setSpecies(e.target.value)} className="flex-1 bg-white text-primary-anthracite-80 border border-secondary-40 rounded-md  p-3">
      <option value="">Species</option>
      {allSpecies.map((specie: string) => (
        <option key={specie} value={specie}>
          {specie}
        </option>
      ))}
    </select>
  )
}

export default SelectSpecies
