import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { readFile } from 'node:fs/promises';
import * as utils from '../utils.js';

export async function getConfig(key) {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const configPath = __dirname + "/../config.json";
    const config = JSON.parse(await readFile(configPath));
    return config[key];
}

export function getArguments(argumentList) {
    function getArgument(arg) {
        const [_, argument, value] = arg.match(/--(\w+)=?(.*)/);
        if (!argumentList.includes(argument)) {
            throw Error(
                `"${argument}" is not one of the accepted arguments (${argumentList})`
            );
        }
        return { [argument]: value || true };
    }

    const args = process.argv.filter((a, i) => i > 1).map(getArgument);

    return utils.listToObject(args);
}

export function getDirname(url) {
    const __filename = fileURLToPath(url);
    const __dirname = dirname(__filename);
    return __dirname;
}

export function printInColor(color) {
    const escapeMap = {
        reset: "\x1b[0m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
    };
    return function _print(string) {
        console.log(escapeMap[color] + string + escapeMap.reset);
    };
}

export const printInRed = printInColor("red");
export const printInGreen = printInColor("green");