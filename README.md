MG - Langage IA en français

![MG](https://img.shields.io/badge/MG-Langage%20IA-blue)
![Fal.ai](https://img.shields.io/badge/Fal.ai-Client-orange?logo=robot)
![Mastra](https://img.shields.io/badge/Mastra-Client-yellow)
![SingleStore](https://img.shields.io/badge/SingleStore-DB-red)
![Transformers.js](https://img.shields.io/badge/Transformers.js-Local-green)

MG est un **langage IA unique en français**, permettant d’interagir avec plusieurs fournisseurs IA et d’utiliser des bibliothèques npm tout en gardant une syntaxe simple et lisible.

---

## Installation

```bash
npm install -g mg-lang
```
Utilisation
``
Créer un fichier exemple.mg :
Forget resultat = attends clientMG.modele('fal-ai/sdxl').prompt('Crée un logo minimaliste').executer()
afficher(resultat)
afficher('Service en ligne sur localhost:3000')
Puis lancer :
MG lancer exemple.mg
Syntaxe MG
Mot-clé MG	Correspondance JSl
call	import
Forget	const
Remember	let
rapide faire	async function
attends	await
afficher	console.log
Multi-fournisseurs IA
Fal.ai
Mastra
SingleStore
Transformers.js (local)
Contribution
PR et issues bienvenues. Suivez la syntaxe MG et testez vos fichiers .mg.
Licence
ISC © Mauricio
