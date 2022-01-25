import { Pokemon } from './models';

export interface ForQueryingPokemons {
  getPokemonByItsID(id: string): Promise<Pokemon>;
  getPokemonByItsName(name: string): Promise<Pokemon>;
}
