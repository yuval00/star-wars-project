import React, { useEffect, useState } from 'react'
import { useFavoriteCharacters } from '../FavoritesContext';
import CharacterList from '../common/CharacterList';


const canPaginate = (listLength: number, currentPage: number, forward: boolean) => {
    if (forward) {
        return currentPage * 10 <= listLength;
    } else {
        return currentPage !== 1;
    }
}

export default function FavoritesList() {
    const { favoriteCharacters } = useFavoriteCharacters();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentListLength, setCurrentListLength] = useState<number>(Object.values(favoriteCharacters).length);
    
    useEffect(() => {
        setCurrentListLength(Object.values(favoriteCharacters).length)
    }, [favoriteCharacters]);

    return (
        <div className='w-full h-full rounded-2xl bg-yellow-200 shadow-md px-2 py-2 flex flex-col items-center gap-2'>
            <h1 className='font-bold text-xl'>Favorites</h1>
            <CharacterList isFavorites currentPage={currentPage} onPaginate={(next) => {setCurrentPage(next ? currentPage + 1 : currentPage - 1)}} 
            list={{ currentList: Object.values(favoriteCharacters).slice((currentPage - 1) * 10, currentListLength > (currentPage * 10) - 1 ? currentPage * 10 : currentListLength), 
                next: canPaginate(currentListLength, currentPage, true) ? 'a' : null, previous: canPaginate(currentListLength, currentPage, false) ? 'a' : null}} />
        </div>
    )
}