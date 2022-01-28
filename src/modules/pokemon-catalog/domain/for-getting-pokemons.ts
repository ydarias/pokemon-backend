import { Pokemon } from './models';

export interface ForGettingPokemons {
  getPokemonById(id: string): Promise<Pokemon>;
  getPokemonByName(name: string): Promise<Pokemon>;
  findPokemons(limit: number, skip: number, filter?: PokemonsQueryFilter): Promise<Pokemon[]>;
  countPokemons(filter?: PokemonsQueryFilter): Promise<number>;
  findTypes(): Promise<string[]>;
}
