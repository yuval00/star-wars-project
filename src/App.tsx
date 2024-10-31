import React from 'react';
import SearchableList from './components/SearchableList/SearchableList';
import FavoritesList from './components/FavoritesList/FavoritesList';
import { FavoriteCharactersProvider } from './components/FavoritesContext';

function App() {
  return (
    <div className="bg-blue-900 h-screen min-h-screen overflow-clip flex items-center justify-center">
      <div className='w-3/4 h-3/4 bg-gray-300 rounded-3xl px-6 py-4 grid grid-rows-1 grid-cols-2 gap-8'>
          <FavoriteCharactersProvider>
            <SearchableList />
            <FavoritesList />
          </FavoriteCharactersProvider>
      </div>
    </div>
  );
}

export default App;
