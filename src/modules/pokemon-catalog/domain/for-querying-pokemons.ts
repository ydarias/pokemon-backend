import { Pokemon } from './models';

export interface ForQueryingPokemons {
  getPokemonByItsID(id: string): Promise<Pokemon>;
  getPokemonByItsName(name: string): Promise<Pokemon>;
  getPageOfPokemons(limit: number, skip: number, filter?: SearchFilter): Promise<Pokemon[]>;
  getNumberOfPokemons(filter?: SearchFilter): Promise<number>;
}
