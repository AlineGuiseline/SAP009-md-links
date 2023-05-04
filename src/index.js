const fs = require('fs')
const chalk = require('chalk');
const {extractLinks, checkStatusOfLinks, validatedList} = require('./validation.js');

function isFile(path) {
  try {
    return fs.lstatSync(path).isFile();
  } catch (error) {
    return false;
  }
}

function isDirectory(path) {
  try {
    return fs.lstatSync(path).isDirectory();
  } catch (error) { 
    return false;
  }
}

//path (caminho do arquivo ou diretório a ser analisado)
//options (um objeto que contém opções para a análise, validate e stats)

//coordena a análise do arquivo ou diretório
function mdLinks(path, options) {
  if (!isFile(path) && !isDirectory(path)) {
    console.log(chalk.redBright('Arquivo ou diretório não existe'));
    return;
  }
   if (isDirectory(path)) {
    fs.promises.readdir(path)
      .then(files => {
        files.forEach((fileName) => {
          const filePath = `${path}/${fileName}`;
          extractLinks(filePath)
            .then(result => {
              if (options.stats && options.validate) {
                checkStatusOfLinks(result)
                .then(({totalLinks, uniqueLinks, brokenLinks}) => {
                  console.log(chalk.yellow(`--- Estatísticas totais dos links do arquivo: ${chalk.black.bgGreen(fileName)}\n${chalk.magenta('Total:')} ${chalk.magenta(totalLinks)}\n${chalk.cyan('Unique:')} ${chalk.cyan(uniqueLinks)}\n${chalk.red('Broken:')} ${chalk.red(brokenLinks)}`))
                })
              } else if (options.stats) {
                checkStatusOfLinks(result)
                  .then(({totalLinks, uniqueLinks}) => {
                    console.log(chalk.yellow(`--- Estatísticas dos links do arquivo: ${chalk.black.bgGreen(fileName)}\n${chalk.magenta('Total:')} ${chalk.magenta(totalLinks)}\n${chalk.cyan('Unique:')} ${chalk.cyan(uniqueLinks)}`))
                  })
              } else if (options.validate) {
                validatedList(result)
                  .then((category) => {
                    console.log(chalk.yellow('--- Lista de links válidos:'),
                    chalk.black.bgGreen(fileName)),
                    category.map(({text, href, file, status}) => console.log(`${chalk.blue(file)} | ${chalk.magenta(text)} | ${chalk.cyan(href)} | ${status} `))
                  });
              } else if (result.length === 0) {
                  console.log(chalk.red(`Não há links no arquivo ${chalk.underline.red(fileName)}`))
              } else {
                  console.log(chalk.black.bgGreen('--- Lista de links:'),
                  chalk.yellow(fileName)),
                  result.map(({text, href, file}) => console.log(`${chalk.green(text)} \n href: ${chalk.blue(href)} \n pasta: ${chalk.magenta(file)}`));
              }
            })
        });
      });
  }
  if (isFile(path)) {
    if (!path.endsWith('.md')) {
      extractLinks(path);
      console.log(chalk.red('Extensão inválida'));
    } else {
      extractLinks(path)
        .then(links => {
          if (options.stats && options.validate) {
            checkStatusOfLinks(links)
              .then(({ totalLinks, uniqueLinks, brokenLinks }) => {
                console.log(chalk.yellow(`--- Estatísticas totais dos links:\n${chalk.magenta('- Total:')} ${chalk.magenta(totalLinks)}\n${chalk.cyan('- Unique:')} ${chalk.cyan(uniqueLinks)}\n${chalk.red('- Broken:')} ${chalk.red(brokenLinks)}`))
              })
          } else if (options.stats) {
            checkStatusOfLinks(links)
              .then(({ totalLinks, uniqueLinks }) => {
                console.log(chalk.yellow(`--- Estatísticas dos links: \n${chalk.magenta('- Total:')} ${chalk.magenta(totalLinks)}\n${chalk.cyan('- Unique:')} ${chalk.cyan(uniqueLinks)}`))
              })
          } else if (options.validate) {
            validatedList(links)
              .then((category) => {
              console.log(chalk.yellow('--- Lista de links válidos:')),
              category.map(({text, href, file, status}) => console.log(`${chalk.blue(file)} | ${chalk.magenta(text)} | ${chalk.cyan(href)} | ${status} `))
              });
          } else if (links.length === 0) {
            console.log(chalk.red('\n', 'Não há links no arquivo indicado'))
          } else {
            console.log(chalk.black.bgGreen('--- Lista de links:')),
            links.map(({text, href, file}) => console.log(`${chalk.green(text)} \n href: ${chalk.blue(href)} \n pasta: ${chalk.magenta(file)}`));
        }
        });
     }
  }
}

module.exports = {isFile, isDirectory, mdLinks};


// lib fs
//1º parâmetro: caminho do arquivo que ele vai ler
//2º parâmetro: qual é o encoding de caracteres que ele vai encontrar (ex.: UTF-8)
//3º parâmetro: função callback (erro e retorno)