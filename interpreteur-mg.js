import { clientMG } from './index.js';

export async function runMG(codeMG) {
  // Remplacer les mots-clés MG par JS
  let codeJS = codeMG
    .replace(/Forget /g, 'const ')
    .replace(/call /g, 'import ')
    .replace(/afficher\(/g, 'console.log(')
    .replace(/attends /g, 'await ')
    .replace(/rapide faire/g, 'async function');

  // Exécuter le code JS généré
  const func = new Function('clientMG', `return (async()=>{ ${codeJS} })()`);
  await func(clientMG);
}

