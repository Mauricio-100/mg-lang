const { program } = require('commander');
const CustomAIModel = require('./src/ai-model');

// Configuration de la commande AI
program
  .command('ai <input>')
  .description('Utiliser le modèle IA personnalisé')
  .action(async (input) => {
    try {
      const ai = new CustomAIModel();
      const result = await ai.process(input);
      console.log('Résultat:', result);
    } catch (error) {
      console.error('Erreur:', error.message);
    }
  });

// Autres commandes...

program.parse(process.argv);
