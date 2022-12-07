import { useCharacters } from '../context/useCharacters'

const SelectSpecies = () => {
  const { species, submitSpecies } = useCharacters()
  return (
    <select value={species} onChange={(e) => submitSpecies(e.target.value)} className="flex-1 bg-white border rounded  p-3">
      <option value="">Species</option>
      <option value="Alien">Alien</option>
      <option value="Human">Human</option>
      <option value="Robot">Robot</option>
      <option value="Animal">Animal</option>
      <option value="Disease">Disease</option>
      <option value="Humanoid">Humanoid</option>
      <option value="Cronenberg">Cronenberg</option>
      <option value="Poopybutthole">Poopybutthole</option>
      <option value="Mythological Creature">Mythological Creature</option>
      <option value="unknown">unknown</option>
    </select>
  )
}

export default SelectSpecies
