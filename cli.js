#!/usr/bin/env node
import { runMG } from './interpreteur-mg.js';
import fs from 'fs';
import yargs from 'yargs';

const argv = yargs(process.argv.slice(2))
  .command('lancer <fichier>', 'Exécute un fichier MG', yargs => {
    yargs.positional('fichier', { describe: 'Chemin du fichier MG', type: 'string' });
  })
  .help()
  .argv;

if (argv._[0] === 'lancer') {
  const codeMG = fs.readFileSync(argv.fichier, 'utf8');
  runMG(codeMG);
}
