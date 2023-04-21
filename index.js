/*module.exports = () => {
  // ...
};
*/

const fs = require('fs')
const chalk = require('chalk');

function extractLinks(text) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const catchRegex = [...text.matchAll(regex)]
  const result = catchRegex.map(captura => ({[captura[1]]: captura[2]}));
  return result;
}

function handleError(error) {
  throw new Error(chalk.red(error.code, 'não há arquivo no diretório'));
}

// Promessa com then/catch
function showFile(filePath) {
  fs.promises.readFile(filePath, 'utf-8')
    .then((text) => console.log(extractLinks(text)))
    .catch(handleError)
}

showFile('./src/teste.md')

/*
// Promessa com new Promise()
function showFile(filePath) {
  fs.readFile(filePath, 'utf-8', (error, text) => {
    return new Promise((resolve, reject) => {
      if (!text) {
        reject(handleError(error))
      }
        resolve(console.log(extractLinks(text)))
    })
  })
}

showFile('./src/teste.md')
*/

// lib fs
//1º parâmetro: caminho do arquivo que ele vai ler
//2º parâmetro: qual é o encoding de caracteres que ele vai encontrar (ex.: UTF-8)
//3º parâmetro: função callback (erro e retorno)

/*
//exibir o arquivo no console
const file = 'src/teste.md'
fsp.readFile(file, 'utf-8').then(console.log).catch(console.error)

//mostrar a extensão do arquivo
const test = path.extname('thumb.png')
console.log(test)

//mostrar os arquivos dentro de uma pasta
fsp.readdir(path.join(__dirname)).then(files => {
  const mdFiles = files.filter(file => file.endsWith('.md'))  

  console.log(mdFiles)
}).catch(console.error)
*/
