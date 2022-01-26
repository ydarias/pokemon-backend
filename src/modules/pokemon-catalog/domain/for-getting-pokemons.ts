import { Pokemon } from './models';

export interface ForGettingPokemons {
  getPokemonById(id: string): Promise<Pokemon>;
  getPokemonByName(name: string): Promise<Pokemon>;
  findPokemons(page: number, size: number): Promise<Pokemon[]>;
  countPokemons(): Promise<number>;
}
