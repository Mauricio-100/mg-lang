const vm = require('vm');
const { promisify } = require('util');
const { exec } = require('child_process');
const execAsync = promisify(exec);
const fs = require('fs').promises;

class MGLangEngine {
  constructor() {
    this.context = vm.createContext({
      afficher: console.log,
      Vrai: true,
      Faux: false,
      Neant: null,
      Liste: Array,
      Dictionnaire: Object,
      // Ajout de l'objet Fichier pour les opérations sur les fichiers
      Fichier: {
        lire: this.lireFichier,
        ecrire: this.ecrireFichier,
        copier: this.copier.bind(this)
      }
    });
  }

  // Permet d'installer dynamiquement des modules npm si absents
  async requireDynamic(moduleName) {
    try {
      return require(moduleName);
    } catch (error) {
      if (error.code === 'MODULE_NOT_FOUND') {
        console.log(`Module '${moduleName}' non trouvé. Installation...`);
        await execAsync(`npm install ${moduleName}`);
        return require(moduleName);
      }
      throw error;
    }
  }

  async execute(code) {
    try {
      let jsCode = code
        // Variables et Constantes
        .replace(/\bForget\s+([^=]+)=\s*(.+)/g, 'const $1 = $2')
        .replace(/\bRemember\s+([^=]+)=\s*(.+)/g, 'let $1 = $2')
        
        // Imports dynamiques
        .replace(/\bCall\s+'([^']+)'/g, 'await this.requireDynamic("$1")')
        
        // Conditions
        .replace(/\bSi\s+(.+?)\s+Alors/g, 'if ($1) {')
        .replace(/\bSinonSi\s+(.+?)\s+Alors/g, '} else if ($1) {')
        .replace(/\bSinon/g, '} else {')
        .replace(/\bFinSi/g, '}')
        
        // Boucles
        .replace(/\bPour\s+chaque\s+(\w+)\s+dans\s+(\w+)\s+Faire/g, 'for (const $1 of $2) {')
        .replace(/\bFinPour/g, '}')
        .replace(/\bTantQue\s+(.+?)\s+Faire/g, 'while ($1) {')
        .replace(/\bFinTantQue/g, '}')

        // Mots-clés directs
        .replace(/\battends\b/g, 'await')
        .replace(/\bafficher\((.*)\)/g, 'console.log($1)');

      // Encapsuler dans une fonction asynchrone pour gérer `await` au plus haut niveau
      const script = new vm.Script(`(async () => { ${jsCode} })()`);
      
      // Lier 'this' de requireDynamic au contexte d'exécution
      this.context.requireDynamic = this.requireDynamic.bind(this);

      return await script.runInContext(this.context);
    } catch (error) {
      console.error('Erreur MG :', error.message);
      throw error;
    }
  }

  // --- Opérations sur les fichiers ---
  async lireFichier(chemin) {
    return await fs.readFile(chemin, 'utf-8');
  }

  async ecrireFichier(chemin, contenu) {
    return await fs.writeFile(chemin, contenu);
  }

  async copier(source, destination) {
    const content = await this.lireFichier(source);
    return await this.ecrireFichier(destination, content);
  }
}

module.exports = MGLangEngine;
