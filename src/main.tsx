import React from 'react'
import ReactDOM from 'react-dom/client'
import './all.css'
import './all.min.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './Root'
import Redirect from './Redirect'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from './theme'
import { LocalStorageService } from './service/LocalStorageService'
import { PokemonService } from './service/PokemonService'
import { PokemonProvider, useDataPokemon } from './context/PokemonContext'
import { Entity } from './models/Entity'
import { EntityService } from './service/EntityService'
import { GuessStats } from './components/guess-stats/GuessStats'
import { Home2 } from './components/Home2'
import { Wordle } from './components/wordle/Wordle'

const createRandomRoute = <T extends Entity>(path: string, useData: () => T[], service: EntityService<T>) => ([{
  path: path + "/guess-stats",
  element: <GuessStats<T> useData={useData} service={service} />,
}, {
  path: path + "/wordle",
  element: <Wordle<T> useData={useData} service={service} />,
}]);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home2 />,
      },
      ...createRandomRoute('/pokemon', useDataPokemon, new PokemonService()),
    ],
    errorElement: <Redirect />,
  }
])

LocalStorageService.init();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <PokemonProvider service={new PokemonService()}>
        <RouterProvider router={router} />
      </PokemonProvider>
    </ChakraProvider>
  </React.StrictMode>,
)