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
import Wordle from './components/wordle/Wordle'
import { PokemonProvider } from './context/PokemonContext'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Random />,
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
      <PokemonProvider>
        <RouterProvider router={router} />
      </PokemonProvider>
    </ChakraProvider>
  </React.StrictMode>,
)