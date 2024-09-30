const apiKeyArray = process.env.TMDB_API_KEY;
const newArray = apiKeyArray ? apiKeyArray.split(",") : [];

export function getRandomApiKey(): string {
  const randomKey = Math.floor(Math.random() * newArray.length);
  return newArray[randomKey];
}
