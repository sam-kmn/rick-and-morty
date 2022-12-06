import { useState, useEffect, useMemo } from 'react'
import { useCharacters } from '../context/useCharacters'
import { Character } from '../interfaces'

const Table = () => {
  const { characters, page, apiPage } = useCharacters()

  const [pageCharacters, setPageCharacters] = useState([])
  const pages = useMemo(() => Array.from({ length: 4 }, (_, i) => i + (apiPage || 1) * 4 - 3), [apiPage])

  useEffect(() => {
    const currentChunk = pages.findIndex((i) => i === page)
    if (currentChunk > -1 && characters.length > 0) setPageCharacters(characters[currentChunk])
  }, [page, pages])

  return (
    <table className=" bg-white text-start rounded">
      <thead className="border-b-2 ">
        <tr className="">
          <th className="text-start p-3">Check</th>
          <th className="text-start p-3">Name</th>
          <th className="text-start p-3">Avatar</th>
          <th className="text-start p-3">Origin</th>
          <th className="text-start p-3">Gender</th>
          <th className="text-start p-3">Status</th>
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
              <tr key={character.id} className="border-b m-1">
                <td className="text-start p-3">{character.id}</td>
                <td className="text-start p-3">{character.name}</td>
                <td className="text-start p-3">
                  <img src={character.image} alt="" className="w-10 h-10 rounded-xl shadow-xl" />
                </td>

                <td className="text-start p-3">{character.origin.name}</td>
                <td className="text-start p-3">{character.gender}</td>
                <td className="text-start p-3">{character.status}</td>
              </tr>
            ))}
      </tbody>
    </table>
  )
}

export default Table
