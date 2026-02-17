import './GuessStatsAttributs.css'
import { Box, Text } from '@chakra-ui/react'
import { Entity } from '../../../../models/Entity'
import { Attribut } from '../../../../models/Attribut'
import { GuessStatsAttributsCase } from './GuessStatsAttributsCase'
import { Stringabble, stringabbleToString } from '../../../../utils/Stringabble'

interface PokeguessProps<T extends Entity> {
  entityGuess: T
  entityToGuess: T
  isAnimated?: boolean
  attributs: Attribut<any, T>[]
}

export function GuessStatsAttributs<T extends Entity>({ entityGuess, entityToGuess, attributs, isAnimated }: PokeguessProps<T>) {

  const getColor = (var1: Stringabble, var2: Stringabble) => {
    if (Array.isArray(var1) && Array.isArray(var2)) {
      if (var1.length == var2.length && var1.every(v => var2.includes(v))) {
        return "green"
      } else if (var1.some(v => var2.includes(v))) {
        return "orange"
      } else {
        return "red"
      }
    } else if (Array.isArray(var1)) {
      return var1.includes(var2) ? "orange" : "red"
    } else if (Array.isArray(var2)) {
      return var2.includes(var1) ? "orange" : "red"
    } else {
      if (var1.toString() == var2.toString()) {
        return "green"
      } else {
        return "red"
      }
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

  const delay = Math.min(-25 * attributs.length + 600, 500);

  return (
    <Box display="flex" gap="10px" id={'pokeguess-' + entityGuess.id}>
      <GuessStatsAttributsCase index={0} isAnimated={isAnimated}><img src={entityGuess.sprite} alt={entityGuess.name} /></GuessStatsAttributsCase>

      {attributs.flatMap((attribut: Attribut<Stringabble, T>, index: number) => attribut.columns).map((col, colIndex) => {
        const valGuess = col.value(entityGuess);
        const valToGuess = col.value(entityToGuess);
        return <GuessStatsAttributsCase key={colIndex} index={colIndex + 1}
          bg={getColor(valGuess, valToGuess)}
          arrowHigh={typeof valGuess === "number" && typeof valToGuess === "number" ? getArrow(valGuess, valToGuess) : undefined}
          isAnimated={isAnimated}
          delay={delay}>
          <Text color="white" fontSize={Math.min(16, 450 / stringabbleToString(valGuess).length)}>
            {stringabbleToString(valGuess)}
          </Text>
        </GuessStatsAttributsCase>
      })}
    </Box>
  )
}