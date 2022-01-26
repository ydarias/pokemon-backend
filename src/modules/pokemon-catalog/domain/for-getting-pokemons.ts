import { Pokemon } from './models';

export interface ForGettingPokemons {
  getPokemonById(id: string): Promise<Pokemon>;
  getPokemonByName(name: string): Promise<Pokemon>;
  findPokemons(limit: number, skip: number, filter?: SearchFilter): Promise<Pokemon[]>;
  countPokemons(filter?: SearchFilter): Promise<number>;
}
