import { Pokemon } from './models';

export interface ForGettingPokemons {
  getPokemonById(id: string): Pokemon;
}
