import MangratV2Omini from '@mauriciotukss2/mangrat-v2omini';

export const clientMG = new MangratV2Omini({
  falKey: process.env.FAL_KEY,
  mastraKey: process.env.MASTRA_KEY,
  singlestoreKey: process.env.SS_KEY
});
