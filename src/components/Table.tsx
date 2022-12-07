import { useState, useEffect, useMemo } from 'react'
import { useCharacters } from '../context/useCharacters'
import { Character } from '../utils/interfaces'

const statusIcons = {
  Alive: 'bi bi-check-circle text-green-500',
  Dead: 'bi bi bi-exclamation-circle text-red-500',
  unknown: 'bi bi-question-circle-fill text-gray-400',
}

const Table = () => {
  const { characters, page, apiPage, error } = useCharacters()

  const [pageCharacters, setPageCharacters] = useState([])
  const pages = useMemo(() => Array.from({ length: 4 }, (_, i) => i + (apiPage || 1) * 4 - 3), [apiPage])

  useEffect(() => {
    const currentChunk = pages.findIndex((i) => i === page)
    if (currentChunk > -1 && characters.length > 0) setPageCharacters(characters[currentChunk])
  }, [page, pages])

  if (error)
    return (
      <div className=" flex flex-col justify-center items-center py-44">
        <div className="relative text-3xl font-semibold">
          <img className="w-24 absolute -top-28 h-auto" src="https://media2.giphy.com/media/dz6NpfESnqqcnJH1MY/giphy.gif?cid=790b7611ee3e294560ea6c0dc11453ace0fc1e04ad693835&rid=giphy.gif&ct=s" alt="" />
          {error}
        </div>
      </div>
    )
  return (
    <table className="table-fixed bg-white text-start rounded-lg shadow-xl">
      <thead className="border-b-2 ">
        <tr className="font-medium">
          <th>Check</th>
          <th>Name</th>
          <th>Avatar</th>
          <th>Origin</th>
          <th>Gender</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {pageCharacters.length === 0 ? (<LoadingSkeleton />) : (
          pageCharacters.map((character: Character) => (
            <tr key={character.id} className={`border-b m-1 ${character.status == 'Dead' && 'bg-gray-100'}`}>
              <td>{character.id}</td>
              <td className=" flex flex-col">
                <p className="font-semibold">{character.name}</p>
                <p className="text-gray-500">{character.species}</p>
              </td>
              <td>
                <img src={character.image} alt="" className="w-12 h-12 rounded-xl shadow-xl border-2 border-slate-200 border-dashed" />
              </td>
              <td>{character.origin.name}</td>
              <td>{character.gender}</td>
              <td className=" flex items-center gap-2 font-medium">
                <i className={statusIcons[character.status]}></i>
                {character.status}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}

export default Table

const LoadingSkeleton = () => {
  return (
    <>
      {[...Array(5).keys()].map((row: number) => (
        <tr key={row} className="">
          <td>
            <div className="bg-gray-200 h-5 w-1/3 rounded-xl animate-pulse"></div>
          </td>

          <td>
            <div className="bg-gray-200 h-5 w-full rounded-xl animate-pulse"></div>
          </td>

          <td>
            <div className="bg-gray-200 h-12 w-12 animate-pulse rounded-xl"></div>
          </td>

          <td>
            <div className="bg-gray-200 h-5 w-3/4 rounded-xl animate-pulse"></div>
          </td>

          <td>
            <div className="bg-gray-200 h-5 w-1/3 rounded-xl animate-pulse"></div>
          </td>

          <td>
            <div className="bg-gray-200 h-5 w-1/3 rounded-xl animate-pulse"></div>
          </td>
        </tr>
      ))}
    </>
  )
}
