import React from "react";
import { Character, Homeworld } from "../../types/characters";

type Props = {
  open: boolean,
  onClose: () => void;
  character: Character,
  homeworld: Homeworld | null
}

export default function CharacterModal({ open, onClose, character, homeworld }: Props) {
    return (
      <div
        onClick={onClose}
        className={`
          fixed inset-0 flex justify-center items-center transition-colors
          ${open ? "visible bg-black/20" : "invisible"}
        `}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
            bg-white rounded-xl shadow p-6 transition-all w-1/2 
            ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
          `}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
          >
            X
          </button>
          <div className="flex items-center flex-col gap-2">
            <h5>{character.name}</h5>
            <h6>{`Height: ${character.height}[m]`}</h6>
            <h6>{`Mass: ${character.mass}[kg]`}</h6>
            <h6>{`Birth Year: ${character.birth}`}</h6>
            <h6>{`Number of Films: ${character.films}`}</h6>
            <h5>Home Planet</h5>
            { homeworld ?
              <>
                <h6>{homeworld.name}</h6>
                <h6>{`Population: ${homeworld.population}`}</h6>
                <h6>{`Climate: ${homeworld.climate}`}</h6>
                <h6>{`Terrain: ${homeworld.terrain}`}</h6>
              </>
            :
              <h6>Fetching Home Planet data...</h6>
            }
          </div>
        </div>
      </div>
    )
  }