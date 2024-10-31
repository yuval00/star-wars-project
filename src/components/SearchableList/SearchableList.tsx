import React, { useState } from 'react'
import SearchBar from './SearchBar'
import loader from '../../images/loader.svg'
import { HandleCharacterListFetching } from '../../api/fetcher';
import { SearchData } from '../../types/response';
import CharacterList from '../common/CharacterList';
import { useFavoriteCharacters } from '../FavoritesContext';

export default function SearchableList() {
    const { favoriteCharacters } = useFavoriteCharacters();
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [currentCharacterList, setCurrentCharacterList] = useState<SearchData>();
    const [hasError, setHasError] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const onSearchUpdate = async (prompt: string) => {
        setIsSearching(true);
        setHasError(false);
        try {
            const updatedCharacterList = await HandleCharacterListFetching(prompt, false, favoriteCharacters);
            setCurrentCharacterList(updatedCharacterList);
        } catch {
            setHasError(true);
        }
        setIsSearching(false);
    }

    const onPaginate = async (next: boolean) => {
        setIsSearching(true);
        setHasError(false);
        setCurrentPage(next ? currentPage + 1 : currentPage - 1)
        try {
            const toFetch = currentCharacterList ? (next ? currentCharacterList?.next : currentCharacterList?.previous) : '';
            const updatedCharacterList = await HandleCharacterListFetching(toFetch, true, favoriteCharacters);
            setCurrentCharacterList(updatedCharacterList);
        } catch {
            setHasError(true);
        }
        setIsSearching(false);
    }

    return (
        <div className='w-full h-full rounded-2xl bg-yellow-200 shadow-md px-2 py-2 flex flex-col gap-2'>
            <SearchBar onSearchUpdated={onSearchUpdate} isFetching={false} />
            <div className='flex h-full items-center justify-center'>
                {
                    hasError ? 
                    <h1 className='text-red-800'>
                        Fetching error. Please try again
                    </h1> :
                    isSearching ? <img src={loader} alt='loading...' className="w-32 h-32" /> : 
                    <CharacterList onPaginate={onPaginate} list={currentCharacterList} currentPage={currentPage} />
                }
            </div>
        </div>
  )
}
