#!/usr/bin/env node
import { program } from 'commander';
import { exec } from 'child_process';
import fs from 'fs';
import MGLangEngine from './index.js';
import CustomAIModel from './src/ai-model.js';

program
  .name('mg')
  .description('MG-lang - Langage de programmation français-friendly avec support IA')
  .version('2.3.0');

program
  .command('lancer [fichier]')
  .description('Lancer un fichier MG ou entrer en mode interactif')
  .action(async (fichier) => {
    const engine = new MGLangEngine();
    if (fichier) {
      try {
        const content = fs.readFileSync(fichier, 'utf-8');
        console.log(`🚀 Exécution du fichier : ${fichier}`);
        await engine.execute(content);
      } catch (error) {
        console.error(`❌ Erreur lors de l'exécution du fichier : ${error.message}`);
      }
    } else {
      console.log('Mode interactif non implémenté.');
    }
  });

program
  .command('ai <texte>')
  .description("Analyser une chaîne de texte avec le modèle d'IA intégré")
  .action(async (texte) => {
    try {
      const ai = new CustomAIModel();
      const resultat = await ai.process(texte);
      console.log('Résultat de l\'IA :', resultat);
    } catch (error) {
      console.error('❌ Erreur IA :', error.message);
    }
  });

program
  .command('install <paquet>')
  .description('Installer un paquet npm et le sauvegarder dans package.json')
  .action((paquet) => {
    console.log(`📦 Installation de ${paquet}...`);
    exec(`npm install ${paquet} --save`, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Erreur d'installation : ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Erreur NPM : ${stderr}`);
        return;
      }
      console.log(stdout);
      console.log(`✅ ${paquet} a été installé avec succès !`);
    });
  });

program.parse(process.argv);
