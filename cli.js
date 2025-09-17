#!/usr/bin/env node
const { program } = require('commander');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const MGLangEngine = require('./index');

program
  .name('mg')
  .description('MG-lang - Langage de programmation français-friendly avec support IA')
  .version('2.2.2');

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
        console.error(`❌ Erreur lors de la lecture ou l'exécution du fichier : ${error.message}`);
      }
    } else {
      console.log('Bienvenue en mode interactif MG-lang. Tapez "exit" pour quitter.');
      // Logique pour le mode interactif (REPL) à implémenter
    }
  });

program
  .command('ai <texte>')
  .description("Analyser une chaîne de texte avec le modèle d'IA intégré")
  .action(async (texte) => {
    try {
      const CustomAIModel = require('./src/ai-model');
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
        console.error(`❌ Erreur lors de l'installation : ${error.message}`);
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
