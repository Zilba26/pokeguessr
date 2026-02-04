import './GuessStatsAttributs.css'
import { Box } from '@chakra-ui/react'
import { Entity } from '../../../models/Entity'
import { Attribut } from '../../../models/Attribut'
import { GuessStatsAttributsCase } from './GuessStatsAttributsCase'

interface PokeguessProps<T extends Entity> {
  entityGuess: T
  entityToGuess: T
  isAnimated?: boolean
  attributs: Attribut<any, T>[]
}

export function GuessStatsAttributs<T extends Entity>({ entityGuess, entityToGuess, attributs, isAnimated }: PokeguessProps<T>) {

  const getColor = (var1: any, var2: any) => {
    if (var1 == var2) {
      return "green"
    } else {
      return "red"
    }
  }

  const getArrow = (nb: number, nbToGuess: number) => {
    const diff = nb - nbToGuess;
    if (diff > 0) {
      return false
    } else if (diff < 0) {
      return true
    } else {
      return undefined;
    }
  }

  return (
    <Box display="flex" gap="10px" id={'pokeguess-' + entityGuess.id}>
      <GuessStatsAttributsCase index={0} isAnimated={isAnimated}><img src={entityGuess.sprite} alt={entityGuess.name} /></GuessStatsAttributsCase>

      {attributs.flatMap((attribut: Attribut<any, T>, index: number) => attribut.columns).map((col, colIndex) => {
        const valGuess = col.value(entityGuess);
        const valToGuess = col.value(entityToGuess);
        return <GuessStatsAttributsCase key={colIndex} index={colIndex + 1}
          bg={getColor(valGuess, valToGuess)}
          arrowHigh={col.withArrow ? getArrow(valGuess, valToGuess) : undefined}
          isAnimated={isAnimated}>
          {valGuess}
        </GuessStatsAttributsCase>
      })}
    </Box>
  )
}