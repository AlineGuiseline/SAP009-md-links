#!/usr/bin/env node
const {mdLinks} = require('./index.js');
const chalk = require('chalk');

const path = process.argv[2];
const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats'),
}

mdLinks(path, options).then((response) => {
  //console.log(response)
  if (options.stats && options.validate) {
    if (Array.isArray(response)) {
      response.map(({totalLinks, uniqueLinks, brokenLinks}) => {
        console.log(chalk.yellow(`--- Estatísticas totais dos links:\n${chalk.magenta('- Total:')} ${chalk.magenta(totalLinks)}\n${chalk.cyan('- Unique:')} ${chalk.cyan(uniqueLinks)}\n${chalk.red('- Broken:')} ${chalk.red(brokenLinks)}`))
      })
    } else {
    console.log(chalk.yellow(`--- Estatísticas totais dos links:\n${chalk.magenta('- Total:')} ${chalk.magenta(response.totalLinks)}\n${chalk.cyan('- Unique:')} ${chalk.cyan(response.uniqueLinks)}\n${chalk.red('- Broken:')} ${chalk.red(response.brokenLinks)}`))
  }
} else if (options.stats) {
  if(Array.isArray(response)) {
    response.map(({totalLinks, uniqueLinks}) => {
      console.log(chalk.yellow(`--- Estatísticas dos links: \n${chalk.magenta('- Total:')} ${chalk.magenta(totalLinks)}\n${chalk.cyan('- Unique:')} ${chalk.cyan(uniqueLinks)}`))
    })
  } else {
    console.log(chalk.yellow(`--- Estatísticas dos links: \n${chalk.magenta('- Total:')} ${chalk.magenta(response.totalLinks)}\n${chalk.cyan('- Unique:')} ${chalk.cyan(response.uniqueLinks)}`))
  }
  } else if (options.validate) {
    if(response.every((item) => Array.isArray(item))) {
      response.forEach((item) => {
        console.log(chalk.yellow('--- Lista de links válidos:')),
        item.map(({text, href, file, status}) => console.log(`${chalk.blue(file)} | ${chalk.magenta(text)} | ${chalk.cyan(href)} | ${status} `))         
      })
    } else {
    console.log(chalk.yellow('--- Lista de links válidos:')),
    response.map(({text, href, file, status}) => console.log(`${chalk.blue(file)} | ${chalk.magenta(text)} | ${chalk.cyan(href)} | ${status} `))         
  }
  } else if (response.length === 0) {
    console.log(chalk.red('\n', 'Não há links no arquivo indicado'))
  } else {
    if(response.every((item) => Array.isArray(item) || !item)) {
      response.forEach((item) => {
        //console.log(item)
                  //chalk.yellow(fileName)),
                  if (item.length === 0) {
                    console.log(chalk.red(`Não há links no arquivo`))
                  } else {
                    console.log(chalk.black.bgGreen('--- Lista de links:'))
                    item.map(({text, href, file}) => console.log(`${chalk.green(text)} \n href: ${chalk.blue(href)} \n pasta: ${chalk.magenta(file)}`));
                  }
              })
    } else {
    console.log(chalk.black.bgGreen('--- Lista de links:')),
    response.map(({text, href, file}) => console.log(`${chalk.green(text)} \n href: ${chalk.blue(href)} \n pasta: ${chalk.magenta(file)}`));
    }
  }
})