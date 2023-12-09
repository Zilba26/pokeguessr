import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { Pokemon } from '../models/Pokemon';
import { PokemonService } from '../service/PokemonService';

export const PokemonContext = createContext<Pokemon[]>([]);

interface PokemonProviderProps extends PropsWithChildren { }

export const PokemonProvider = ({ children }: PokemonProviderProps) => {
  const [data, setData] = useState<Pokemon[]>([]);

  const setAndFetchData = async () => {
    console.log('Fetching data...');
    const pokemonService = new PokemonService();
    const pokemons = await pokemonService.getAllPokemons();
    setData(pokemons);
  }

  useEffect(() => {
    if (data.length === 0) {
      setAndFetchData();
    }
  }, [data]);

  return (
    <PokemonContext.Provider value={data}>
      {children}
    </PokemonContext.Provider>
  );
};
