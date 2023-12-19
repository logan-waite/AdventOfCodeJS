import { writeFile, mkdir } from "node:fs/promises";
import { getArguments, getConfig, getDirname, printInRed } from "./utils.js";

const fileStub = `export function part1(input) {
    return "part1 has not been implemented";
}

export function part2(input) {
    return "part2 has not been implemented";
}`;

async function getInput(year, day) {
    const url = `https://adventofcode.com/${year}/day/${day}/input`
    const session = await getConfig('session');
    const response = await fetch(url, {
        headers: {
            cookie: `session=${session}`
        },
    });

    if (response.ok) {
        return (await response.text()).trim()
    } else {
        throw new Error(`Couldn't fetch data from ${url}`)
    }
}

async function run() {
    const args = getArguments(["day", "year"]);
    const __dirname = getDirname(import.meta.url);

    const savedYear = await getConfig('year');

    const day = args.day ?? 1;
    const year = args.year ?? savedYear ?? new Date().getFullYear();


    const basePath = __dirname + `/../${year}/day_${day}/`;

    try {
        // make day_x directory
        await mkdir(basePath, { recursive: true });

        // create empty files for input.txt and test.txt
        const input = await getInput(year, day);
        await writeFile(basePath + "input.txt", input);
        await writeFile(basePath + "test.txt", "");

        // create index.js file with stubbed
        // if the day has already been created, throw error
        await writeFile(basePath + "index.js", fileStub, { flag: 'wx' });
    } catch (e) {
        printInRed(`Unable to generate files for ${year}-${day}`);
        if (e.message.includes('file already exists')) {
            printInRed('This day has already been started. If you want to redo the day, please delete the directory and try again.')
        } else {
            throw Error(e);
        }
    }
}

run();