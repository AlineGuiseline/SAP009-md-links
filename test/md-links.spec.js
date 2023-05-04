const {mdLinks} = require('../src/index.js');
const chalk = require('chalk');

describe('mdLinks', () => {
    //passou
it('throw an error if is not a file', () => {
    const logSpy = jest.spyOn(global.console, 'log');

    mdLinks('./teste/teste.js', {})

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(`${chalk.redBright("Arquivo ou diretório não existe")}`);

    logSpy.mockRestore();
})

    //passou
it('throw an error if is not a directory', () => {
    const logSpy = jest.spyOn(global.console, 'log');

    mdLinks('./teste', {})

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(`${chalk.redBright("Arquivo ou diretório não existe")}`);

    logSpy.mockRestore();
})

    //passou
it('throw an error if is not a .md file', () => {
    const logSpy = jest.spyOn(global.console, 'log');

    mdLinks('./files/teste.html', {})

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(`${chalk.red('Extensão inválida')}`);

    logSpy.mockRestore();
})

    //CORRIGIR
it('show a list of links', () => {
    const logSpy = jest.spyOn(global.console, 'log');

    mdLinks('./files/another-teste.md', {validate: false, stats: false})

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith([
        {
          href: "https://www.youtube.com",
          text: "YouTube",
        },
        {
          href: "https://meusite.com.br",
          text: "Meu site",
        },
        {
          href: "https://www.facebook.com",
          text: "Facebook",
        },
        {
          href: "https://www.youtube.com",
          text: "YouTube",
        },
      ]);

    logSpy.mockRestore();
})
});