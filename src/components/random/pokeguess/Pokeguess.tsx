import { FC, PropsWithChildren } from 'react'
import { Pokemon } from '../../../models/Pokemon'
import './Pokeguess.css'
import { Box, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { animated, useSpring } from 'react-spring'

interface CustomTdProps extends PropsWithChildren{
  bg?: string,
  index: number,
  arrowHigh?: boolean,
}

const CustomTd: FC<CustomTdProps> = (props) => {

  const boColor = useColorModeValue('black', 'white');

  const animationProps = useSpring({
    opacity: 1,
    transform: 'rotateY(0deg)',
    from: { opacity: 0, transform: 'rotateY(-180deg)' }, // Débutez avec une rotation à 180 degrés
    delay: 400 * props.index, // Ajoutez un délai basé sur l'index pour décaler l'animation de chaque élément
  });

  const getArrow = () => {
    if (props.arrowHigh == true) {
      return <Box pos="absolute" top="-10px" left="calc(50% - 10px)" w="0" h="0" borderLeft="10px solid transparent" borderRight="10px solid transparent" borderBottom="10px solid white" />
    } else if (props.arrowHigh == false) {
      return <Box pos="absolute" bottom="-10px" left="calc(50% - 10px)" w="0" h="0" borderLeft="10px solid transparent" borderRight="10px solid transparent" borderTop="10px solid white" />
    } else {
      return <></>
    }
  }


  return (
    <animated.div style={animationProps}>
      <Box m="10px" className='customTD' pos="relative">
        <Box textAlign="center" bg={props.bg} border="2px" borderColor={boColor} borderRadius="8px" w="80px" h="80px" 
          display="flex" alignItems="center" justifyContent="center" p="10px" color="white">
          {props.children}
        </Box>
        {getArrow()}
      </Box>
    </animated.div>
  );
}

interface PokeguessProps {
    pokemonGuess: Pokemon
    pokemonToGuess: Pokemon
}

export const Pokeguess: FC<PokeguessProps> = (props: PokeguessProps) => {

  const getColor = (var1: any, var2: any) => {
    if (var1 == var2) {
      return "green"
    } else {
      return "red"
    }
  }

  const pg = props.pokemonGuess;
  const ptg = props.pokemonToGuess;
  

  const getArrow = (nb: number) => {
    if (nb > 0) {
      return false
    } else if (nb < 0) {
      return true
    } else {
      return undefined;
    }
  }

  return (
    <Box display="flex" gap="10px" id={'pokeguess-' + props.pokemonGuess.pokedexId}>
      <CustomTd index={0}><img src={pg.sprite} alt={pg.name} /></CustomTd>
      <CustomTd index={1} bg={getColor(pg.types[0], ptg.types[0])}>{pg.types[0]}</CustomTd>
      <CustomTd index={2} bg={getColor(pg.types[1], ptg.types[1])}>{pg.types[1] ?? "Aucun"}</CustomTd>
      <CustomTd index={3} bg={getColor(pg.generation, ptg.generation)}>{pg.generation}</CustomTd>
      <CustomTd index={4} bg={getColor(pg.evolutionStage, ptg.evolutionStage)}>{pg.evolutionStage}</CustomTd>
      <CustomTd index={5} bg={getColor(pg.weight, ptg.weight)}>{pg.weight}</CustomTd>
      <CustomTd index={6} bg={getColor(pg.height, ptg.height)} arrowHigh={getArrow(pg.height - ptg.height)}>{pg.height}</CustomTd>
    </Box>
  )
}