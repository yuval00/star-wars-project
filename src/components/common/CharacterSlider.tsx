import React, { useEffect, useState } from 'react'
import { Character } from '../../types/characters'
import { useFavoriteCharacters } from '../FavoritesContext';
import emptyStar from '../../images/star-outline.svg';
import filledStar from '../../images/star-filled.svg';

type Props = {
    character: Character;
    onOpenCharacter: (char: Character) => void;
}

export default function CharacterSlider({character, onOpenCharacter}: Props) {
    const { favoriteCharacters, addCharacter, removeCharacter } = useFavoriteCharacters();
    const [isFavorite, setIsFavorite] = useState<boolean>(favoriteCharacters.hasOwnProperty(character.name));

    useEffect(() => {
        setIsFavorite(favoriteCharacters.hasOwnProperty(character.name))
    }, [favoriteCharacters, character]);

    const handleFavorite = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        if (isFavorite) {
            removeCharacter(character.name);
        } else {
            addCharacter(character);
        }
    }

    return (
        <div onClick={() => onOpenCharacter(character)} className="w-full rounded-lg bg-red-800 flex flex-row items-center shadow-2xl h-12 px-2 py-2 gap-2 hover:bg-red-600 cursor-pointer">
            <img src={character.imageUrl} alt='' className="h-full aspect-square rounded-full" />
            <h6 className="text-white font-bold">{character.name}</h6>
            <div className="ml-auto flex items-center" onClick={handleFavorite}>
                <img src={isFavorite ? filledStar : emptyStar} alt='favorite' className="h-4 aspect-square" />
            </div>
        </div>
    )
}