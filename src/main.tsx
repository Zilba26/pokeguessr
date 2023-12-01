import React from 'react'
import ReactDOM from 'react-dom/client'
import './all.css'
import './all.min.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './Root'
import Redirect from './Redirect'
import { Random } from './components/random/Random'
import { TyradexAPI } from './repository/TyradexAPI'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from './theme'
import { PokemonService } from './service/PokemonService'



const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <div>Home</div>
      },
      {
        path: '/random',
        element: <Random />,
        loader: async () => {
          const pokemonService = new PokemonService();
          const pokemons = await pokemonService.getAllPokemons();
          const pokemonToGuess = pokemonService.getRandomPokemon(pokemons);
          return {
            pokemonsInit: pokemons,
            pokemonToGuessInit: pokemonToGuess
          }
        }
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