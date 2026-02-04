import { useColorModeValue, Box } from "@chakra-ui/react";
import { PropsWithChildren, FC } from "react";
import { useSpring, animated } from "react-spring";

interface GuessStatsAttributsCaseProps extends PropsWithChildren {
  bg?: string,
  index: number,
  arrowHigh?: boolean,
  isAnimated?: boolean
}

export const GuessStatsAttributsCase: FC<GuessStatsAttributsCaseProps> = (props) => {

  const boColor = useColorModeValue('black', 'white');

  const animationProps = useSpring({
    opacity: 1,
    transform: 'rotateY(0deg)',
    from: { opacity: 0, transform: 'rotateY(-180deg)' }, // Débutez avec une rotation à 180 degrés
    delay: 400 * props.index, // Ajoutez un délai basé sur l'index pour décaler l'animation de chaque élément
  });

  const getArrow = () => {
    if (props.arrowHigh == true) {
      return <Box
        pos="absolute"
        w="40px"
        h="60px"
        top="calc(50% - 30px)"
        left="calc(50% - 20px)"
      >
        {/* Corps */}
        <Box
          pos="absolute"
          top="50px"          // commence après la pointe
          left="50%"
          transform="translateX(-50%)"
          w="22px"
          h="14px"
          bg="rgba(0, 0, 0, 0.35)"
        />

        {/* Pointe */}
        <Box
          pos="absolute"
          top="0"
          left="50%"
          transform="translateX(-50%)"
          w="0"
          h="0"
          borderLeft="28px solid transparent"
          borderRight="28px solid transparent"
          borderBottom="50px solid rgba(0, 0, 0, 0.35)"
        />
      </Box>
    } else if (props.arrowHigh == false) {
      return <Box
        pos="absolute"
        w="56px"
        h="64px"
        top="calc(50% - 32px)"
        left="calc(50% - 28px)"
      >
        {/* Corps */}
        <Box
          pos="absolute"
          top="0"
          left="50%"
          transform="translateX(-50%)"
          w="22px"
          h="14px"
          bg="rgba(0, 0, 0, 0.35)"
        />

        {/* Pointe */}
        <Box
          pos="absolute"
          bottom="0"
          left="50%"
          transform="translateX(-50%)"
          w="0"
          h="0"
          borderLeft="28px solid transparent"
          borderRight="28px solid transparent"
          borderTop="50px solid rgba(0, 0, 0, 0.35)"
        />
      </Box>

    } else {
      return <></>
    }
  }


  return (
    <animated.div style={props.isAnimated == false ? {} : animationProps}>
      <Box m="10px" className='customTD' pos="relative">
        <Box textAlign="center" bg={props.bg} border="2px" borderColor={boColor} borderRadius="8px" w="90px" h="90px"
          display="flex" alignItems="center" justifyContent="center" p="10px" color="white" fontWeight='500'>
          {props.children}
        </Box>
        {getArrow()}
      </Box>
    </animated.div>
  );
}