import React, { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce';
import loader from '../../images/loader.svg'

type Props = {
    isFetching: boolean,
    onSearchUpdated: (prompt: string) => void,
}

export default function SearchBar({onSearchUpdated, isFetching}: Props) {
    const [currentSearchContent, setCurrentSearchContent] = useState<string>('');
    const [debouncedSearch] = useDebounce(currentSearchContent, 500);

    useEffect(() => {
        onSearchUpdated(debouncedSearch);
    }, [debouncedSearch]);
  
    return (
        <>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input value={currentSearchContent} type="search" id="search" onChange={e => setCurrentSearchContent(e.target.value)}
                className="block w-full p-4 ps-10 text-sm rounded-full bg-white border-gray-600 placeholder-gray-400 text-black" 
                placeholder="Search for a character" />
                {isFetching && <div className="absolute inset-y-0 end-12 flex items-center pe-3 pointer-events-none">
                    <img src={loader} alt='loading...' className="w-8 h-8" />
                </div>}
            </div>
        </>  
    )
}