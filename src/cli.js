const {showFile, handleError} = require('./index.js');
const chalk = require('chalk');
const fs = require('fs');
const listaValidada = require('./validation.js');

const path = process.argv;

function showList(result, nameIdentifier = '') {
    /*if (validate) {
        console.log(
            chalk.yellow('Lista validada'),
            chalk.black.bgGreen(nameIdentifier),
            listaValidada(result))
    } else {
        console.log(
            chalk.yellow('Lista de links'),
            chalk.black.bgGreen(nameIdentifier),
            result)
    }*/
    console.log(
        chalk.yellow('Lista de links'),
        chalk.black.bgGreen(nameIdentifier),
        result)
}

function processText(arguments) {
  const filePath = arguments[2];
//  const validate = arguments[3] === '--valida';

  if (fs.lstatSync(filePath).isFile()) {
    showFile(arguments[2])
      .then((result) => {
        showList(result);
      })
      .catch((error) => {
        console.log(chalk.red('Houve algum erro com o arquivo. Favor rever as informações'));
      });
  } else if (fs.lstatSync(filePath).isDirectory()) {
    fs.promises
      .readdir(filePath)
      .then((files) => {
        files.forEach((fileName) => {
          showFile(`${filePath}/${fileName}`)
            .then((list) => {
              showList(list, fileName);
            })
            .catch((error) => {
              console.log(chalk.red('Houve algum erro com o diretório informado. Favor rever as informações'));
            });
        });
      })
      .catch((error) => {
        handleError(error)
      });
  }
}

processText(path);
