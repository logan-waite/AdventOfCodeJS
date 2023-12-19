// General
export const chunk = curry(
    function _chunk(chunkSize, list) {
        return list.reduce((result, cur, i) => {

            const lastChunk = result.length > 0 ? result.slice(-1)[0] : [];
            const isExistingChunk = lastChunk.length < chunkSize;
            const workingChunk = isExistingChunk ? lastChunk : [];
            workingChunk.push(cur);
            if (!isExistingChunk) {
                result.push(workingChunk);
                return result;
            } else {
                return result.toSpliced(-1, 1, workingChunk);
            }
        }, []);
    }
)

export function createArray(length, fill) {
    const list = Array(length);
    if (typeof fill === "function") {
        return list.fill(0).map(fill);
    } else {
        return list.fill(fill);
    }
}

export function curry(fn) {
    return function _curry(...args) {
        if (args.length >= fn.length) {
            return fn(...args);
        } else {
            return (...more) => _curry(...args, ...more);
        }
    };
}

export const filter = curry(
    function _filter(predicate, list) {
        return list.filter(predicate);
    }
)

export function flatten(list) {
    return list.flat();
}

export function head(list) {
    const [head] = list;
    return head;
}

export function intersection(list1, list2) {
    return list1.filter((x) => list2.includes(x));
}

export const join = curry(
    function _join(joiner, list) {
        return list.join(joiner);
    }
)

/** 
* Checks if a string is an integer
* @param {string} char
*/
export function isNumeric(char) {
    if (char.length > 1) {
        throw new Error('isNumeric can only check single characters!')
    }
    return !!parseInt(char)
}

export function listToObject(arr) {
    return arr.reduce((obj, cur) => {
        const [key] = Object.keys(cur);
        obj[key] = cur[key];
        return obj;
    }, {});
}

export const map = curry(
    function _map(func, list) {
        return list.map(func);
    }
)

export function pipe(...fns) {
    return function _piped(initial) {
        return fns.reduce((val, fn) => fn(val), initial);
    };
}

export function range(start, end) {
    if (start === end) {
        return [start];
    }
    return createArray(end - start + 1, (_, i) => i + start);
}

export const reduce = curry(
    function _reduce(func, initial, list) {
        return list.reduce(func, initial)
    }
)

export function reverse(thing) {
    if (typeof thing === 'string') {
        return thing.split('').reverse().join('');
    } else {
        return thing.reverse();
    }
}

/** 
* splits a string along a delimiter
* curried
* @param {string} delimiter
* @param {string} str
*/
export const splitString = curry(
    function _splitString(delimiter, string) {
        return string.split(delimiter);
    }
)

export function sum(numbers) {
    return numbers.reduce((sum, num) => {
        return sum + num;
    });
}

/** 
* Gives back the last item in a list
* @param {T[]} list
* @returns {T}
*/
export function last(list) {
    return list[list.length - 1];
}

export function tap(val) {
    console.log({ val });
    return val;
}

export function unique(list) {
    return [...new Set(list)];
}