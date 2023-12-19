import { splitString, isNumeric, sum, head, last, pipe, filter, map, join, reverse } from '../../utils.js';

export function part1(input) {
    const lines = splitString('\n', input);
    const getLineDigits = pipe(
        splitString(''),
        filter(isNumeric),
        (numbers) => [head(numbers), last(numbers)],
        join(''),
    )

    return pipe(
        map(getLineDigits),
        map(Number),
        sum
    )(lines);
}

export function part2(input) {
    const numberNameMap = {
        'zero': 0,
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5,
        'six': 6,
        'seven': 7,
        'eight': 8,
        'nine': 9,
    }

    const lines = splitString('\n', input);

    function getFirstNumber(line, numberMap = numberNameMap, i = 0) {
        let chunk = line.slice(i, i + 5);
        const nameMatch = head(filter((name) => chunk.includes(name), Object.keys(numberMap)))
        if (nameMatch) {
            chunk = chunk.replace(nameMatch, numberMap[nameMatch])
        }
        const numberMatch = head(chunk.split('').filter(isNumeric))
        if (numberMatch) {
            return numberMatch
        } else {
            return getFirstNumber(line, numberMap, i + 1)
        }
    }

    function getLastNumber(line) {
        const reversedLine = reverse(line);
        const reversedMap = Object.keys(numberNameMap)
            .map(reverse)
            .reduce((obj, name, i) => {
                obj[name] = i;
                return obj
            }, {});
        return getFirstNumber(reversedLine, reversedMap);
    }

    return sum(map((line) => {
        const firstNumber = getFirstNumber(line);
        const lastNumber = getLastNumber(line);
        const number = '' + firstNumber + lastNumber;
        return parseInt(number);

    }, lines));
}