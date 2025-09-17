const vm = require('vm');
const { promisify } = require('util');
const { exec } = require('child_process');
const execAsync = promisify(exec);
const fs = require('fs').promises;

class MGLangEngine {
  constructor() {
    this.context = vm.createContext({
      Print: console.log,
      Vrai: true,
      Faux: false,
      Néant: null,
      Liste: Array,
      Dictionnaire: Object,
      await: this.awaitHandler.bind(this)
    });
    
    this.types = {
      'Texte': String,
      'Nombre': Number,
      'Booléen': Boolean,
      'Liste': Array,
      'Dictionnaire': Object
    };
  }

  async awaitHandler(promise) {
    return await promise;
  }

  async requireDynamic(moduleName) {
    try {
      return require(moduleName);
    } catch (error) {
      if (error.code === 'MODULE_NOT_FOUND') {
        console.log(`Installation de ${moduleName}...`);
        await execAsync(`npm install ${moduleName}`);
        return require(moduleName);
      }
      throw error;
    }
  }

  parseTypeAnnotation(code) {
    return code.replace(/:Texte/g, '')
      .replace(/:Nombre/g, '')
      .replace(/:Booléen/g, '')
      .replace(/:Liste/g, '')
      .replace(/:Dictionnaire/g, '');
  }

  async execute(code) {
    try {
      // Prétraitement du code MG
      let jsCode = code
        .replace(/Forget\s+([^=]+)=/g, 'const $1 =')
        .replace(/Call\s+'([^']+)'/g, 'await requireDynamic("$1")')
        .replace(/Do\s+([^\n|]+)(?:\s*\|\s*([^\n]+))?/g, (match, fn, pipeline) => {
          if (pipeline) {
            return `await (${fn}).then(${pipeline})`;
          }
          return `await ${fn}`;
        })
        .replace(/Si\s+(.+?)\s+Alors/g, 'if ($1) {')
        .replace(/SinonSi\s+(.+?)\s+Alors/g, '} else if ($1) {')
        .replace(/Sinon/g, '} else {')
        .replace(/FinSi/g, '}')
        .replace(/Pour\s+chaque\s+(\w+)\s+dans\s+(\w+)\s+Faire/g, 'for (const $1 of $2) {')
        .replace(/FinPour/g, '}')
        .replace(/Tester\s+"([^"]+)"\s+Faire/g, 'test("$1", async () => {')
        .replace(/FinTester/g, '})')
        .replace(/Affirmer\s+que\s+(.+?)\s+Égal\s+(.+)/g, 'expect($1).toBe($2)');

      // Gestion des annotations de type
      jsCode = this.parseTypeAnnotation(jsCode);

      // Exécution dans le contexte sandbox
      const script = new vm.Script(jsCode);
      return await script.runInContext(this.context);
    } catch (error) {
      console.error('Erreur MG:', error.message);
      throw error;
    }
  }

  // Méthodes pour les opérations fichiers en français
  async lireFichier(chemin) {
    return await fs.readFile(chemin, 'utf-8');
  }

  async écrireFichier(chemin, contenu) {
    return await fs.writeFile(chemin, contenu);
  }

  async copier(source, destination) {
    const content = await this.lireFichier(source);
    return await this.écrireFichier(destination, content);
  }
}

module.exports = MGLangEngine;
