import { useState, useEffect, useMemo } from 'react'
import { useCharacters } from '../context/useCharacters'
import { Character } from '../utils/interfaces'

const statusIcons = {
  Alive: 'bi bi-check-circle text-green-500',
  Dead: 'bi bi bi-exclamation-circle text-red-500',
  unknown: 'bi bi-question-circle-fill text-gray-400',
}

const Table = () => {
  const { characters, page, apiPage } = useCharacters()

  const [pageCharacters, setPageCharacters] = useState([])
  const pages = useMemo(() => Array.from({ length: 4 }, (_, i) => i + (apiPage || 1) * 4 - 3), [apiPage])

  useEffect(() => {
    const currentChunk = pages.findIndex((i) => i === page)
    if (currentChunk > -1 && characters.length > 0) setPageCharacters(characters[currentChunk])
  }, [page, pages])

  return (
    <table className="table-fixed bg-white text-start rounded-lg shadow-xl">
      <thead className="border-b-2 ">
        <tr className="font-medium">
          <th className="text-start p-3 font-medium">Check</th>
          <th className="text-start p-3 font-medium">Name</th>
          <th className="text-start p-3 font-medium">Avatar</th>
          <th className="text-start p-3 font-medium">Origin</th>
          <th className="text-start p-3 font-medium">Gender</th>
          <th className="text-start p-3 font-medium">Status</th>
        </tr>
      </thead>

      <tbody className="">
        {pageCharacters.length === 0
          ? [...Array(5).keys()].map((row) => (
              <tr key={row} className="">
                <td className="p-3">
                  <div className="bg-gray-200 h-5 w-1/3 rounded-xl animate-pulse"></div>
                </td>

                <td className="p-3">
                  <div className="bg-gray-200 h-5 w-full rounded-xl animate-pulse"></div>
                </td>

                <td className="p-3">
                  <div className="bg-gray-200 h-7 w-7 animate-pulse rounded-xl"></div>
                </td>

                <td className="p-3">
                  <div className="bg-gray-200 h-5 w-2/3 rounded-xl animate-pulse"></div>
                </td>

                <td className="p-3">
                  <div className="bg-gray-200 h-5 w-1/3 rounded-xl animate-pulse"></div>
                </td>
              </tr>
            ))
          : pageCharacters.map((character: Character) => (
              <tr key={character.id} className={`border-b m-1 ${character.status == 'Dead' && 'bg-gray-100'}`}>
                <td className="text-start p-3">{character.id}</td>
                <td className="text-start p-3 flex flex-col">
                  <p className="font-semibold">{character.name}</p>
                  <p className="text-gray-500">{character.species}</p>
                </td>
                <td className="text-start p-3">
                  <img src={character.image} alt="" className="w-12 h-12 rounded-xl shadow-xl border-2 border-slate-200 border-dashed" />
                </td>

                <td className="text-start p-3">{character.origin.name}</td>
                <td className="text-start p-3">{character.gender}</td>
                <td className="text-start p-3 flex items-center gap-2 font-medium">
                  <i className={statusIcons[character.status]}></i>
                  {character.status}
                </td>
              </tr>
            ))}
      </tbody>
    </table>
  )
}

export default Table
