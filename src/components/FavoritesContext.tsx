// FavoriteCharactersContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Character } from '../types/characters';

interface FavoriteCharactersContextType {
  favoriteCharacters: Record<string, Character>;
  addCharacter: (character: Character) => void;
  removeCharacter: (name: string) => void;
}

const FavoriteCharactersContext = createContext<FavoriteCharactersContextType | undefined>(undefined);

export const FavoriteCharactersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favoriteCharacters, setFavoriteCharacters] = useState<Record<string, Character>>({});

  const addCharacter = (character: Character) => {
    setFavoriteCharacters((prev) => ({
      ...prev,
      [character.name]: character,
    }));
  };

  const removeCharacter = (name: string) => {
    setFavoriteCharacters((prev) => {
      const { [name]: removed, ...rest } = prev;
      return rest;
    });
  };

  return (
    <FavoriteCharactersContext.Provider value={{ favoriteCharacters, addCharacter, removeCharacter }}>
      {children}
    </FavoriteCharactersContext.Provider>
  );
};

export const useFavoriteCharacters = () => {
  const context = useContext(FavoriteCharactersContext);
  if (!context) {
    throw new Error('useFavoriteCharacters must be used within a FavoriteCharactersProvider');
  }
  return context;
};