import chalk from "chalk"
import fs from 'fs'

function extractLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const results = capturas.map(captura => ({[captura[1]]: captura[2]}))
    return results.length !== 0 ? results : 'Não há links no arquivo';
}

function treatment(error) {
    throw new Error(chalk.red(error.code, 'Caminho invalido'))
}

//versao assincrona com await e async
async function getFile(path) {
    try {
        const encoding = 'utf-8'
        const text = await fs.promises.readFile(path, encoding)
        return extractLinks(text);
    } catch (error) {
        console.log(chalk.red(error))
    }
}

//versao assincrona com then()
/*function getFile(path) {
    const encoding = 'utf-8'
    fs.promises
        .readFile(path, encoding)
        .then((text) => console.log(chalk.green(text)))
        .catch((error) => treatment(error))
}*/


//versao sincrona
/*function getFile(path) {
    const encoding = 'utf-8'
    fs.readFile(path, encoding, (error, text) => {
        if(error) {
            treatment(error)
        }

        console.log(chalk.green(text))
    })
}*/

//'./arquivos/texto.md'
export default getFile;
