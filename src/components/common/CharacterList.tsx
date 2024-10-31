import React, { useState } from 'react'
import { SearchData } from '../../types/response'
import CharacterSlider from './CharacterSlider'
import { Character, Homeworld } from '../../types/characters';
import CharacterModal from './CharacterModal';
import { fetchHomeworld } from '../../api/fetcher';

type Props = {
    list: SearchData | undefined,
    currentPage: number,
    onPaginate: (next: boolean) => void;
    isFavorites?: boolean
}

export default function CharacterList({list, currentPage, onPaginate, isFavorites=false}: Props) {
    const [currrentCharacterOpen, setCurrrentCharacterOpen] = useState<Character | null>(null);
    const [currentPlanetURL, setCurrentPlanetURL] = useState<string>('');
    const [currentPlanet, setCurrentPlanet] = useState<Homeworld | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const updateHomeworld = async (url: string) => {
        const homeworld = await fetchHomeworld(url);
        setCurrentPlanet(homeworld);
        setCurrentPlanetURL(url)
    }

    const setModalOpen = (char: Character) => {
        setCurrrentCharacterOpen(char);
        setIsModalOpen(true);
        if (char.homeworld !== currentPlanetURL) {
            setCurrentPlanet(null);
            updateHomeworld(char.homeworld)
        }
    }

    return (
        <div className='h-full w-full flex flex-col gap-2 items-center'>
            {currrentCharacterOpen && <CharacterModal character={currrentCharacterOpen} homeworld={currentPlanet} open={isModalOpen} onClose={() => setIsModalOpen(false)} />}
            {list && list.currentList && list.currentList.length > 0 ?
            <>{list.currentList.map((char) => <CharacterSlider onOpenCharacter={setModalOpen} key={char.name} character={char} />)}
            <div className='flex flex-row gap-2'>
                <button onClick={() => onPaginate(false)} disabled={!!!list?.previous} className='disabled:text-gray-400'>
                    {`<`}
                </button>
                <h6>{currentPage}</h6>
                <button onClick={() => onPaginate(true)} disabled={!!!list?.next} className='disabled:text-gray-400'>
                    {`>`}
                </button>
            </div>
            </> :
            <h1>{isFavorites ? 'Your favorites list is empty.' : 'No matches.'}</h1>}
        </div>
    )
}