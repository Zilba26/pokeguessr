import React, { FC, PropsWithChildren, useState } from 'react'

import './Random.scss'
import { Pokeguess } from '../pokeguess/Pokeguess';
import { Pokemon } from '../../models/Pokemon';
import { useLoaderData } from 'react-router-dom';
import { Box, Button, Input, useColorModeValue, Image } from '@chakra-ui/react';
import { GenSelectBox } from '../gen-select-box/GenSelectBox';
import { PokemonService } from '../../service/PokemonService';

interface RandomProps {
}

export const Random: FC<RandomProps> = (props: RandomProps) => {

  const [pokemonsGuess, setPokemonsGuess] = useState<Pokemon[]>([]);
  const [pokemonList, setPokemonList] = useState<Pokemon[] | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [win, setWin] = useState<boolean>(false);
  const [genSelected, setGenSelected] = useState<boolean[]>([true, true, true, true, true, true, true, true, true]);

  const {pokemonsInit, pokemonToGuessInit} = useLoaderData() as any;
  const [pokemonToGuess, setPokemonToGuess] = useState<Pokemon>(pokemonToGuessInit);
  const [pokemons, setPokemons] = useState<Pokemon[]>(pokemonsInit);

  const children = [];
  for (let i = 0; i < pokemonsGuess.length; i++) {
    children.push(<Pokeguess key={pokemonsGuess[i].pokedexId} pokemonGuess={pokemonsGuess[i]} pokemonToGuess={pokemonToGuess} />);
  }

  const enterPokemon = (pokemonInput?: Pokemon) => {
    if (pokemonInput == undefined) {
      const input = document.querySelector<HTMLInputElement>('input');
      if (input) {
        const pokemonName = input.value;
        const pokemon = pokemons.find((pokemon: Pokemon) => {
          return pokemon.name.toLowerCase() === pokemonName.toLowerCase();
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
    const value = event.target.value;
    let list;
    if (value.length > 2) {
      list = pokemons.filter((pokemon: Pokemon) => {
        return pokemon.name.toLowerCase().startsWith(value.toLowerCase()) && !pokemonsGuess.includes(pokemon);
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

  const toggleGenSelected = (index: number) => {
    const genSelectedCopy = [...genSelected];
    genSelectedCopy[index] = !genSelectedCopy[index];
    setGenSelected(genSelectedCopy);
  }

  const regeneratePokemon = async () => {
    const pokemonService = new PokemonService();
    const pokemons = await pokemonService.getPokemonsByGenSelected(genSelected);
    const pokemonToGuess = pokemonService.getRandomPokemon(pokemons);
    setPokemons(pokemons);
    setPokemonToGuess(pokemonToGuess);
    setPokemonsGuess([]);
    setWin(false);
  }

  const border = useColorModeValue('black', 'white');
  const bg = useColorModeValue('whiteal', 'gray.700');
  const hoverBg = useColorModeValue('gray.100', 'gray.600');

  return (
    <>
    <div id="pyro">
        <div className="before"></div>
        <div className="after"></div>
      </div>
    <div className='random'>
      <Box display="flex" gap="10px">
        <GenSelectBox gen={1} selected={genSelected[0]} onClick={() => toggleGenSelected(0)}></GenSelectBox>
        <GenSelectBox gen={2} selected={genSelected[1]} onClick={() => toggleGenSelected(1)}></GenSelectBox>
        <GenSelectBox gen={3} selected={genSelected[2]} onClick={() => toggleGenSelected(2)}></GenSelectBox>
        <GenSelectBox gen={4} selected={genSelected[3]} onClick={() => toggleGenSelected(3)}></GenSelectBox>
        <GenSelectBox gen={5} selected={genSelected[4]} onClick={() => toggleGenSelected(4)}></GenSelectBox>
        <GenSelectBox gen={6} selected={genSelected[5]} onClick={() => toggleGenSelected(5)}></GenSelectBox>
        <GenSelectBox gen={7} selected={genSelected[6]} onClick={() => toggleGenSelected(6)}></GenSelectBox>
        <GenSelectBox gen={8} selected={genSelected[7]} onClick={() => toggleGenSelected(7)}></GenSelectBox>
        <GenSelectBox gen={9} selected={genSelected[8]} onClick={() => toggleGenSelected(8)}></GenSelectBox>
      </Box>
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
        {/* <p>{pokemonToGuess.name}</p> */}
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
          <RandomTD>Poids</RandomTD>
          <RandomTD>Taille</RandomTD>
        </Box>
        <Box className='table-body' display="flex" flexDir="column-reverse">
          {children}
        </Box>
      </Box>
    </div>
    </>
  )
}

const RandomTD: FC<PropsWithChildren> = (props: PropsWithChildren) => {
  return (
    <Box w="100px" h="50px" border="0px" borderColor="white" display="flex" justifyContent="center" alignItems="center" textAlign="center">
      {props.children}
    </Box>
  )
}