import React, { FC, PropsWithChildren, useEffect, useState } from 'react'

import './Random.scss'
import { Pokeguess } from './pokeguess/Pokeguess';
import { Pokemon } from '../../models/Pokemon';
import { Box, Button, Input, useColorModeValue, Image, Spinner, Center } from '@chakra-ui/react';
import { PokemonService } from '../../service/PokemonService';
import { useDataPokemon } from '../../context/DataContext';
import GenSelect from '../gen-select/GenSelect';

interface RandomProps {
}

export const Random: FC<RandomProps> = (props: RandomProps) => {

  const [pokemonsGuess, setPokemonsGuess] = useState<Pokemon[]>([]);
  const [pokemonList, setPokemonList] = useState<Pokemon[] | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [win, setWin] = useState<boolean>(false);

  const genSelectedLocal = localStorage.getItem("genSelected");
  const [genSelected, setGenSelected] = useState<boolean[]>(
    genSelectedLocal ? JSON.parse(genSelectedLocal) : [true, true, true, true, true, true, true, true, true]);
    
  const pokemonData = useDataPokemon();
  const service = new PokemonService();
  const [pokemons, setPokemons] = useState<Pokemon[]>(pokemonData.filter((pokemon: Pokemon) => genSelected[pokemon.generation - 1]));
  const [pokemonToGuess, setPokemonToGuess] = useState<Pokemon>(service.getRandomPokemon(pokemonData));

  useEffect(() => {
    if (pokemonData.length > 0) {
      const pokemonService = new PokemonService();
      const randomPokemon = pokemonService.getRandomPokemon(pokemonData);

      setPokemonToGuess(randomPokemon);
      setPokemons(pokemonData);
    }
  }, [pokemonData]);

  const enterPokemon = (pokemonInput?: Pokemon) => {
    if (pokemonInput == undefined) {
      const input = document.querySelector<HTMLInputElement>('input');
      if (input) {
        const pokemonName = input.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
        const pokemon = pokemons.find((pokemon: Pokemon) => {
          return pokemon.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase() === pokemonName;
        });
        if (pokemon) {
          pokemonInput = pokemon;
        }
      }
    }
    if (pokemonInput && !pokemonsGuess.includes(pokemonInput)) {
      setPokemonsGuess([...pokemonsGuess, pokemonInput]);
      setPokemonList(null);
      const input = document.querySelector<HTMLInputElement>('input');
      input!.value = '';
      input!.focus();
    }
    if (pokemonInput && pokemonInput == pokemonToGuess) {
      setWin(true);
      const pyro = document.getElementById('pyro');
      pyro?.classList.add('pyro');
      setTimeout(() => {
        pyro?.classList.remove('pyro');
      }, 10000);
    }
  }

  const onGuessInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    let list;
    if (value.length > 2) {
      list = pokemons.filter((pokemon: Pokemon) => {
        return pokemon.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().startsWith(value) && !pokemonsGuess.includes(pokemon);
      });
    } else {
      list = null;
    }
    setSelectedPokemon(list?.[0] ?? null);
    setPokemonList(list);
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (selectedPokemon) {
      if (event.key === 'Enter') {
        enterPokemon(selectedPokemon);
      } else if (event.key === 'ArrowDown') {
        const index = pokemonList?.indexOf(selectedPokemon);
        if (index != undefined && index < pokemonList!.length - 1) {
          setSelectedPokemon(pokemonList![index + 1]);
        }
      } else if (event.key === 'ArrowUp') {
        const index = pokemonList?.indexOf(selectedPokemon);
        if (index != undefined && index > 0) {
          setSelectedPokemon(pokemonList![index - 1]);
        }
      }
    }
  }

  const regeneratePokemon = async () => {
    const pokemonService = new PokemonService();
    const pokemons = pokemonData.filter((pokemon: Pokemon) => genSelected[pokemon.generation - 1]);
    const pokemonToGuess = pokemonService.getRandomPokemon(pokemons);
    setPokemons(pokemons);
    setPokemonToGuess(pokemonToGuess);
    setPokemonsGuess([]);
    setWin(false);
  }

  const border = useColorModeValue('black', 'white');
  const bg = useColorModeValue('whiteal', 'gray.700');
  const hoverBg = useColorModeValue('gray.100', 'gray.600');

  if (pokemonData.length === 0 || !pokemonToGuess) {
    return <Center h="100%" minH="inherit">
      <Spinner size="xl"/>
    </Center>;
  }

  return (
    <>
    <div id="pyro">
      <div className="before"></div>
      <div className="after"></div>
    </div>
    <div className='random'>
      <GenSelect triggerChange={setGenSelected}></GenSelect>
      <Box h="20px"></Box>
      <Button onClick={regeneratePokemon}>Regénérer</Button>
      <Box h="30px"></Box>
      <div className='guess'>
        <div className='dropdown'>
          <Input id='guess-input' onChange={onGuessInputChange} onKeyDown={handleKeyDown}/>
          <Box id='poke-list' borderColor={border} border="1px" bg={bg} display={pokemonList == null ? "none" : "block"} zIndex="100">
            {pokemonList?.length != 0 ? pokemonList?.map((pokemon: Pokemon) => {
              return <Box className='poke-list-item' key={pokemon.pokedexId} bg={pokemon == selectedPokemon ? hoverBg : bg}
                _hover={{bg: hoverBg}} onClick={() => enterPokemon(pokemon)}>
                <Box mr="10px">
                  <img src={pokemon.sprite} alt={pokemon.name} />
                </Box>
                <p>{pokemon.name}</p>
              </Box>
            }): <Box padding="4px">Aucun résultat</Box>} 
          </Box>
        </div>
        <Button onClick={() => enterPokemon()}>Enter</Button>
      </div>

      {(win) && 
        <>
        <Box h="50px"></Box>
        <Image src={pokemonToGuess.sprite} h="200px"></Image>
        </>
      }

      <Box h="50px"></Box>

      <Box>
        <Box className='table-head' display="flex" gap="10px">
          <RandomTD>Pokemon</RandomTD>
          <RandomTD>Type 1</RandomTD>
          <RandomTD>Type 2</RandomTD>
          <RandomTD>Génération</RandomTD>
          <RandomTD>Stade<br/>d'évolution</RandomTD>
          <RandomTD>Couleur</RandomTD>
          <RandomTD>Habitat</RandomTD>
          <RandomTD>Poids (Kg)</RandomTD>
          <RandomTD>Taille (m)</RandomTD>
        </Box>
        <Box className='table-body' display="flex" flexDir="column-reverse">
          {pokemonsGuess.map((pokemon: Pokemon) => {
            return <Pokeguess key={pokemon.pokedexId} pokemonGuess={pokemon} pokemonToGuess={pokemonToGuess} />
          })}
        </Box>
      </Box>
    </div>
    </>
  )
}

const RandomTD: FC<PropsWithChildren> = (props: PropsWithChildren) => {
  return (
    <Box w="110px" h="50px" border="0px" borderColor="white" display="flex" justifyContent="center" alignItems="center" textAlign="center">
      {props.children}
    </Box>
  )
}