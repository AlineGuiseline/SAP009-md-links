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