const chalk = require("chalk");

function checkStatus(listOfURLs) {
  return Promise.all(
    listOfURLs.map((url) => {
      return fetch(url)
      .then(response => {
        if (response.ok) {
          return `${chalk.green('OK')} | ${chalk.green(response.status)}`
        } else {
          return `${chalk.red('FAIL')} |  ${chalk.red(response.status)}`
        }
      })
      .catch(error => {
        if (error.cause.code === 'ENOTFOUND') {
          return chalk.red('O link não foi encontrado');
        } else {
          return chalk.red('Ops... Ocorreu algum erro');
        }
      })
    })
  )
}

function validatedList (listOfLinks) {
  return checkStatus(listOfLinks.map((targetLink) => targetLink.href))
  .then((status) => {
    return listOfLinks.map((objeto, indice) => ({
      ...objeto,
      status: status[indice]
    }));
  });
}

function checkStatusOfLinks (listOfLinks) {
  const totalLinks = listOfLinks.length;
  const uniqueLinks = new Set(listOfLinks.map((targetLink) => targetLink.href)).size;

  return checkStatus(listOfLinks.map((targetLink) => targetLink.href))
  .then((linkStatus) => {
    const brokenLinks = linkStatus.filter(status => status.startsWith(chalk.red('FAIL'))).length;
    return {totalLinks, uniqueLinks, brokenLinks};
  })
  .catch((error) => {
    console.log(error)
  });
}

module.exports = {checkStatus, validatedList, checkStatusOfLinks}

/*
function extraiLinks(arrLinks) {
  return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
}
*/
// Object.values serve para que consigamos extrair apenas valores para dentro de um array.
/*
function handleError(error) {
    if (error.cause.code === 'ENOTFOUND') {
        return 'link não encontrado';
    } else {
        return 'ocorreu um erro'
    }
}

function checaStatus(listaURLs) {
  return Promise.all(
    listaURLs.map((url) => {
      return fetch(url)
        .then((response) => response.status)
        .catch((error) => {
          return handleError(error)
            //console.error(chalk.red(`Erro ao buscar a URL ${url}: ${error}`));
          //throw error;
        });
    })
  );
}
function listaValidada(listaDeLinks) {
    const links = extraiLinks(listaDeLinks);
    
    return checaStatus(links)
      .then((status) => {
        return listaDeLinks.map((objeto, indice) => ({
          ...objeto,
          status: status[indice]
        }));
      })
      /*.catch((error) => {
        console.error(`Erro ao validar lista de links: ${error}`);
        throw error;
      });
  }
  */

  /*
  function checaStatus (listaURLs) {
    return Promise.all(
        listaURLs.map((url) => {
        return fetch(url)
        .then(response => {
            if (response.ok) {
                return `OK | ${response.status}`
            } else {
                return `FAIL | ${response.status}`
            }
        })
        .catch(error => {
            if (error.cause.code === 'ENOTFOUND') {
                return 'Link não encontrado';
            } else { 
                return 'Ocorreu algum erro';
            }
        })
    })) 
}

function listaValidada(arrLinks) {
    return checaStatus(arrLinks.map((objetoLink) => objetoLink.href))
    .then((status) => {
        return arrLinks.map((objeto, indice) => ({
            ...objeto,
            status: status[indice]
        }));
    });
}

module.exports = listaValidada;
*/