import React from 'react'
import ReactDOM from 'react-dom/client'
import './all.css'
import './all.min.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './Root'
import Redirect from './Redirect'
import { Random } from './components/random/Random'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from './theme'
import { PokemonService } from './service/PokemonService'
import { Pokemon } from './models/Pokemon'
import Wordle from './components/wordle/Wordle'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Random />,
        loader: async () => {
          const pokemonService = new PokemonService();
          const pokemons = await pokemonService.getAllPokemons();
          const pokemonToGuess = pokemonService.getRandomPokemon(pokemons);

          const letterCountMap: Record<number, Pokemon[]> = {};
          for (const pokemon of pokemons) {
              const letterCount = pokemon.name.length;

              if (letterCountMap[letterCount]) {
                  letterCountMap[letterCount].push(pokemon);
              } else {
                  letterCountMap[letterCount] = [pokemon];
              }
          }
          console.log(letterCountMap);

          return {
            pokemonsInit: pokemons,
            pokemonToGuessInit: pokemonToGuess
          }
        }
      },
      {
        path: '/wordle',
        element: <Wordle />,
      }
    ],
    errorElement: <Redirect />,
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />  
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)