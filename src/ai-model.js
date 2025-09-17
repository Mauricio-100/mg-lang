// src/ai-model.js
import { pipeline, env } from '@xenova/transformers';

// Configuration pour utiliser les modèles locaux
env.allowLocalModels = true;
env.localModelPath = './src/'; // Indique où chercher les modèles

class CustomAIModel {
  // Le nom du modèle que vous voulez utiliser.
  // Remplacez 'Xenova/all-MiniLM-L6-v2' par 'model.safetensors' si vous
  // avez un modèle compatible de ce nom dans le dossier /src.
  static modelName = 'Xenova/all-MiniLM-L6-v2';
  static instance = null;

  // Crée une instance unique du pipeline (singleton)
  static async getInstance() {
    if (this.instance === null) {
      console.log('🤖 Chargement du modèle IA...');
      // Crée un pipeline "feature-extraction" qui convertit le texte en vecteurs
      this.instance = await pipeline('feature-extraction', this.modelName, {
        progress_callback: (progress) => {
          console.log(`Chargement: ${progress.file} (${Math.round(progress.progress)}%)`);
        }
      });
      console.log('✅ Modèle IA prêt.');
    }
    return this.instance;
  }

  // Méthode pour utiliser le modèle
  async process(input) {
    try {
      const extractor = await CustomAIModel.getInstance();
      
      console.log('🧠 Traitement du texte :', input);
      
      // Utilisation du modèle pour extraire les caractéristiques du texte
      const result = await extractor(input, { pooling: 'mean', normalize: true });

      // On retourne un résultat simplifié
      return {
        succes: true,
        entree: input,
        // Les "embeddings" sont des données complexes, on montre un aperçu
        sortie: `Vecteur de caractéristiques (taille: ${result.data.length})`,
        vecteur: Array.from(result.data).slice(0, 5) // Affiche les 5 premières valeurs
      };
    } catch (error) {
      console.error("❌ Erreur lors du traitement par l'IA :", error.message);
      throw new Error("Impossible d'exécuter le modèle d'IA.");
    }
  }
}

export default CustomAIModel;
