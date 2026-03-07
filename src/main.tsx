import React from 'react'
import ReactDOM from 'react-dom/client'
import './all.css'
import './all.min.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './Root'
import Redirect from './Redirect'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from './theme'
import { PokemonService } from './service/PokemonService'
import { PokemonProvider, useDataPokemon } from './context/PokemonContext'
import { Entity } from './models/Entity'
import { EntityService } from './service/EntityService'
import { GuessStatsPage } from './components/games/guess-stats/GuessStats'
import { Home } from './components/Home'
import { Wordle } from './components/games/worlde/Wordle'
import { GenshinImpactService } from './service/GenshinImpactService'
import { GenshinImpactProvider, useDataGenshinImpact } from './context/GenshinImpactContext'
import { LolProvider, useDataLol } from './context/LolContext'
import { LolService } from './service/LolService'
import { OnePieceProvider, useDataOnePiece } from './context/OnePieceContext'
import { OnePieceService } from './service/OnePieceService'
import { BlurRevealPage } from './components/games/blur-reveal/BlurReveal'

const createRandomRoute = <T extends Entity>(path: string, useData: () => T[], service: EntityService<T>) => ([{
  path: path + "/guess-stats",
  element: <GuessStatsPage<T> useData={useData} service={service} />,
}, {
  path: path + "/wordle",
  element: <Wordle<T> useData={useData} service={service} />,
}, {
  path: path + "/blur-reveal",
  element: <BlurRevealPage<T> useData={useData} service={service} />,
}]);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      ...createRandomRoute('/pokemon', useDataPokemon, new PokemonService()),
      ...createRandomRoute('/genshin-impact', useDataGenshinImpact, new GenshinImpactService()),
      ...createRandomRoute('/lol', useDataLol, new LolService()),
      ...createRandomRoute('/one-piece', useDataOnePiece, new OnePieceService()),
    ],
    errorElement: <Redirect />,
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <PokemonProvider service={new PokemonService()}>
        <GenshinImpactProvider service={new GenshinImpactService()}>
          <LolProvider service={new LolService()}>
            <OnePieceProvider service={new OnePieceService()}>
              <RouterProvider router={router} />
            </OnePieceProvider>
          </LolProvider>
        </GenshinImpactProvider>
      </PokemonProvider>
    </ChakraProvider>
  </React.StrictMode>,
)