export class PokemonNotFoundError extends Error {
  constructor(pokemonId: string) {
    super(`Not found pokemon ${pokemonId}`);
  }
}
