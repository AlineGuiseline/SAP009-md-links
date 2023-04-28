const {mdLinks} = require('./index.js');

const path = process.argv[2];
const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats'),
}

mdLinks(path, options)

/*
const path = process.argv;

function showList(validate, result, nameIdentifier = '') {
    if (validate) {
        console.log(
            chalk.yellow('Lista validada'),
            chalk.black.bgGreen(nameIdentifier),
            listaValidada(result))
    } else {
        console.log(
            chalk.yellow('Lista de links'),
            chalk.black.bgGreen(nameIdentifier),
            result)
    }
} 


function processText(arguments) {
  const filePath = arguments[2];
  const validate = arguments[3] === 'validate';

  if (fs.lstatSync(filePath).isFile()) {
    showFile(arguments[2])
      .then((result) => {
        showList(validate, result);
      })
      .catch(() => {
        console.log(chalk.red('Houve algum erro com o arquivo. Favor rever as informações'));
      });
  } else if (fs.lstatSync(filePath).isDirectory()) {
    fs.promises
      .readdir(filePath)
      .then((files) => {
        files.forEach((fileName) => {
          showFile(`${filePath}/${fileName}`)
            .then((list) => {
              showList(validate, list, fileName);
            })
            .catch(() => {
              console.log(chalk.red('Houve algum erro com o diretório informado. Favor rever as informações'));
            });
        });
      })
      .catch((error) => {
        if (error.code === 'ENOENT') {
            console.log(chalk.red('Arquivo ou diretório não existe'));
          } else {
            console.log(chalk.red('Ocorreu um erro:', error.message));
          }
      });
  }
}

processText(path);
*/