import { useContext } from 'react';
import { PokemonContext } from './PokemonContext';
import { Pokemon } from '../models/Pokemon';


export const useDataPokemon = (): Pokemon[] => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('useData doit être utilisé à l\'intérieur de DataProvider');
  }
  return context;
};