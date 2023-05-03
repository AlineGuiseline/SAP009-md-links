#!/usr/bin/env node
console.log('Oi, CLI!');

const {mdLinks} = require('./index.js');

const path = process.argv[2];
const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats'),
}

mdLinks(path, options)