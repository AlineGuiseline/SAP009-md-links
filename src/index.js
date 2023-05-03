const fs = require('fs')
const chalk = require('chalk');
const {checkStatusOfLinks, validatedList} = require('./validation.js')

function extractLinks(filePath) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;

  return fs.promises.readFile(filePath, 'utf-8')
    .then((text) => {
      const captures = [...text.matchAll(regex)];
      const results = captures.map((capture) => ({
        file: filePath,
        href: capture[2],
        text: capture[1],
      }));
      return results;
    })
    .catch((error) => {throw new Error(chalk.red(error.code, 'Não existe arquivo no diretório indicado'))});
}

function mdLinks(path, options) {
  if (fs.lstatSync(path). isDirectory()) {
    fs.promises.readdir(path)
    .then(files => {
      files.forEach((fileName) => {
        extractLinks(`${path}/${fileName}`)
        .then(result => {
          if (options.stats && options.validate) {
            checkStatusOfLinks(result)
            .then(({totalLinks, uniqueLinks, brokenLinks}) => {
              console.log(chalk.yellow(`Estatísticas dos links do arquivo: ${chalk.black.bgGreen(fileName)}\n${chalk.magenta('Total:')} ${chalk.magenta(totalLinks)}\n${chalk.blue('Unique:')} ${chalk.blue(uniqueLinks)}\n${chalk.blue('Broken:')} ${chalk.blue(brokenLinks)}`))
            })
          } else if (options.stats) {
            checkStatusOfLinks(result)
              .then(({totalLinks, uniqueLinks}) => {
                console.log(chalk.yellow(`Estatísticas dos links do arquivo: ${chalk.underline.yellow(fileName)}\n${chalk.magenta('Total:')} ${chalk.magenta(totalLinks)}\n${chalk.blue('Unique:')} ${chalk.blue(uniqueLinks)}`))
              })
          } else if (options.validate) {
            validatedList(result)
             .then((category) => {
              console.log(chalk.yellow('--- Lista de links válidos:'),
              chalk.yellow(fileName)),
              category.map(({text, href, file, status}) => console.log(`${chalk.blue(file)} | ${chalk.blue(text)} | ${chalk.blue(href)} | ${status} `))});
          } else if (result.length === 0) {
              console.log(chalk.red(`Não há links no arquivo ${chalk.underline.red(fileName)}`))
          } else {
              console.log(chalk.black.bgGreen('--- Lista de links:'),
              chalk.yellow(fileName)),
              result.map(({text, href, file}) => console.log(`${chalk.green(text)} \n href: ${chalk.blue(href)} \n pasta: ${chalk.magenta(file)}`));
          }
        })
      })
    })
  } else {
    extractLinks(path)
      .then(links => {
        if (options.stats && options.validate) {
          checkStatusOfLinks(links)
            .then(({ totalLinks, uniqueLinks, brokenLinks }) => {
              console.log(chalk.yellow(`\n Estatísticas dos links:\n${chalk.magenta('- Total:')} ${chalk.magenta(totalLinks)}\n${chalk.blue('- Unique:')} ${chalk.blue(uniqueLinks)}\n${chalk.cyan('- Broken:')} ${chalk.cyan(brokenLinks)}`))
            })
        } else if (options.stats) {
          checkStatusOfLinks(links)
            .then(({ totalLinks, uniqueLinks }) => {
              console.log(chalk.yellow(`\n Estatísticas dos links: \n${chalk.magenta('- Total:')} ${chalk.magenta(totalLinks)}\n${chalk.blue('- Unique:')} ${chalk.blue(uniqueLinks)}`))
            })
        } else if (options.validate) {
          validatedList(links)
            .then((category) => {
            console.log(chalk.yellow('--- Lista de links válidos:')),
            category.map(({text, href, file, status}) => console.log(`${chalk.blue(file)} | ${chalk.blue(text)} | ${chalk.blue(href)} | ${status} `))});
        } else if (links.length === 0) {
            console.log(chalk.red('\n', 'Não há links no arquivo'))
        } else {
          console.log(chalk.black.bgGreen('--- Lista de links:')),
          links.map(({text, href, file}) => console.log(`${chalk.green(text)} \n href: ${chalk.blue(href)} \n pasta: ${chalk.magenta(file)}`));
        }
    })
  } 
}

module.exports = {mdLinks};




// lib fs
//1º parâmetro: caminho do arquivo que ele vai ler
//2º parâmetro: qual é o encoding de caracteres que ele vai encontrar (ex.: UTF-8)
//3º parâmetro: função callback (erro e retorno)