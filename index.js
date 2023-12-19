import { readFile } from "node:fs/promises";

import { getArguments, getDirname, printInRed, getConfig, printInGreen } from "./cli/utils.js";

const argumentList = ["year", "day", "part", "test"];

async function getInput(basePath, test, part) {
    if (typeof test === "string") {
        return test;
    }

    const path = basePath + (test ? `test_${part}.txt` : "input.txt");
    console.log(path)
    try {
        return await readFile(path, {
            encoding: "utf-8",
        });
    } catch (e) {
        if (path.includes('test_')) {
            try {
                return await readFile(basePath + 'test.txt', {
                    encoding: "utf-8",
                });
            } catch (e) {
                throw e
            }
        }
        console.error(printInRed(`Cannot find file at ${path}!`));
        return;
    }
}

async function main() {
    const args = getArguments(argumentList);
    const __dirname = getDirname(import.meta.url);

    const part = args.part ?? 1
    const day = args.day;
    const year = args.year ?? await getConfig('year');
    const test = args.test

    if (!day) {
        throw Error("`day` is a required argument!");
    }

    const basePath = `${__dirname}/${year}/day_${day}/`;
    const dayModule = await import(basePath + "index.js");

    // --------

    const input = await getInput(basePath, test, part);
    if (!input) {
        printInRed('no input found!');
        return;
    }

    const funcName = `part${part}`;
    const result = dayModule[funcName](input);

    printInGreen(`${year} Day ${day} Part ${part} Result:`)
    console.log(result);
}

main();