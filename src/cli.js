import chalk from "chalk";
import getFile from "./index.js";
import fs from "fs";
import valided from "./http-valided.js";

const path = process.argv;

function print(valid, content, path) {

    if(valid) {
        console.log(chalk.yellow(`Lista validada: ${path}`), valided(content))
    } else {
        console.log(chalk.yellow(`Lista de links: ${path}`), content)
    }
}

async function processFile(parameters) {

    const path = parameters[2]
    const valid = parameters[3] === '--valid'

    console.log(path)

    try {
        fs.lstatSync(path)
    } catch(error) {
        if(error.code === 'ENOENT') {
            console.log(chalk.red('Arquivo não existe'))
            return
        }
    }

    if(fs.lstatSync(path).isFile()) {
        const result = await getFile(path)
        print(valid, result, path)
    } else if(fs.lstatSync(path).isDirectory()) {
        const directoies = await fs.promises.readdir(path)
        directoies.forEach(async (nameFile) => {
            const list = await getFile(`${path}/${nameFile}`)

            print(list, `${path}/${nameFile}`)
        })
    }
}

processFile(path)