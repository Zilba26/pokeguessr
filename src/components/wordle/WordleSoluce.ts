// Function made by dgvai : https://github.com/dgvai/wordle-algorithm/blob/master/wordle.js
const WordleSoluce = (guess: string, solution: string) => {

    const splitSolution = solution.split('')
    const splitGuess = guess.split('')

    const solutionCharsTaken = splitSolution.map((_) => false)

    const statuses = Array.from(Array(guess.length))

    /*
     Correct Cases
    */

    splitGuess.forEach((letter, i) => {
        if (letter === splitSolution[i]) {
            statuses[i] = 'red.500'
            solutionCharsTaken[i] = true
            return
        }
    })

    /*
     Absent Cases
    */

    splitGuess.forEach((letter, i) => {
        if (statuses[i]) return

        if (!splitSolution.includes(letter)) {
            statuses[i] = 'gray.500'
            return
        }

        /*
        Present Cases
        */

        const indexOfPresentChar = splitSolution.findIndex(
            (x, index) => x === letter && !solutionCharsTaken[index]
        )

        if (indexOfPresentChar > -1) {
            statuses[i] = 'yellow.500'
            solutionCharsTaken[indexOfPresentChar] = true
            return
        } else {
            statuses[i] = 'gray.500'
            return
        }
    })

    return statuses
}

export default WordleSoluce