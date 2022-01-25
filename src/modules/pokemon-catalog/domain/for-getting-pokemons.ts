import { Pokemon } from './models';

export interface ForGettingPokemons {
  getPokemonById(id: string): Promise<Pokemon>;
  getPokemonByName(name: string): Promise<Pokemon>;
}
