const { load } = require('@huggingface/transformers');
const path = require('path');

class AIModel {
  constructor() {
    this.model = null;
    this.isLoaded = false;
  }

  async loadModel(modelPath = './models/model.safetensors') {
    try {
      console.log('Chargement du modèle...');
      this.model = await load(path.resolve(modelPath));
      this.isLoaded = true;
      console.log('Modèle chargé avec succès!');
    } catch (error) {
      console.error('Erreur lors du chargement du modèle:', error);
    }
  }

  async process(input) {
    if (!this.isLoaded) {
      await this.loadModel();
    }
    
    // Exemple de traitement avec le modèle
    const output = await this.model(input);
    return output;
  }
}

module.exports = AIModel;
