import { Pokemon } from './models';

export interface ForQueryingPokemons {
  getPokemonByItsID(id: string): Pokemon;
  getPokemonByItsName(name: string): Pokemon;
}
