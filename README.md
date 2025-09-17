# MG - Langage IA en français

<img width="512" height="512" alt="logo" src="https://github.com/user-attachments/assets/97c468da-e64d-4071-bdfa-ff2ded88536b" />


![MG](https://img.shields.io/badge/MG-Langage%20IA-blue)
![Version](https://img.shields.io/npm/v/mg-lang)
![Licence](https://img.shields.io/npm/l/mg-lang)

`MG` est un **langage de programmation unique en français**, conçu pour être simple, lisible et puissant. Il permet d'automatiser des tâches, d'interagir avec des API et d'intégrer des modèles d'Intelligence Artificielle, le tout avec une syntaxe intuitive.

---

## Installation

Pour commencer, installez `MG` globalement via npm :
```bash
npm install -g mg-lang
```

## Démarrage rapide

1.  Créez un fichier `exemple.mg` :
    ```mg
    # Ceci est un commentaire
    Forget message = "Bonjour depuis MG-Lang !"
    afficher(message)

    # Utiliser des fonctionnalités IA
    Forget resultat_ia = attends ia_analyser("Analyse ce texte pour moi.")
    afficher(resultat_ia)
    ```

2.  Exécutez-le avec la commande `lancer` :
    ```bash
    mg lancer exemple.mg
    ```

## Commandes disponibles

-   `mg lancer [fichier]` : Exécute un script MG. Si aucun fichier n'est fourni, lance le mode interactif.
-   `mg install <paquet>` : Installe une bibliothèque npm pour l'utiliser dans vos scripts.
-   `mg ai <texte>` : Utilise le modèle IA intégré pour analyser directement du texte.

## Syntaxe de base

| Mot-clé MG | Équivalent JavaScript | Description |
| :--- | :--- | :--- |
| `Forget nom = valeur` | `const nom = valeur` | Déclare une constante. |
| `Remember nom = valeur`| `let nom = valeur` | Déclare une variable. |
| `afficher(...)` | `console.log(...)` | Affiche un message dans la console. |
| `attends` | `await` | Attend la résolution d'une promesse. |
| `Si ... Alors ... FinSi` | `if (...) { ... }` | Bloc conditionnel. |
| `TantQue ... Faire ... FinTantQue` | `while (...) { ... }` | Boucle `while`. |
| `Fichier.lire('chemin')` | `fs.readFile('path')` | Lit le contenu d'un fichier. |

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une *issue* pour signaler un bug ou proposer une fonctionnalité, ou une *pull request* pour soumettre des améliorations.

## Licence

MIT © Mauricio-100
