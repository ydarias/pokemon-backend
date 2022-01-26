import { ForGettingPokemons } from '../domain/for-getting-pokemons';
import { Pokemon } from '../domain/models';
import { PokemonNotFoundError } from './errors';

import * as pokemons from './pokemons.json';

export class InMemoryPokemonRepository implements ForGettingPokemons {
  async getPokemonById(id: string): Promise<Pokemon> {
    const foundPokemons = pokemons.filter((p) => p.id === id).map((p) => this.toPokemon(p));

    if (foundPokemons.length === 0) {
      throw new PokemonNotFoundError(id);
    }

    return foundPokemons[0];
  }

  async getPokemonByName(name: string): Promise<Pokemon> {
    const foundPokemons = pokemons.filter((p) => p.name.toLowerCase() === name).map((p) => this.toPokemon(p));

    if (foundPokemons.length === 0) {
      throw new PokemonNotFoundError(name);
    }

    return foundPokemons[0];
  }

  private toPokemon(entity: any): Pokemon {
    return {
      id: entity.id,
      name: entity.name,
      classification: entity.classification,
      types: entity.types,
      resistant: entity.resistant,
      weaknesses: entity.weaknesses,
      weight: {
        maximum: entity.weight.maximum.replace('kg', '') as number,
        minimum: entity.weight.minimum.replace('kg', '') as number,
        unit: 'kg',
      },
      height: {
        maximum: entity.height.maximum.replace('m', '') as number,
        minimum: entity.height.minimum.replace('m', '') as number,
        unit: 'm',
      },
      fleeRate: entity.fleeRate,
      evolutionRequirements: entity.evolutionRequirements,
      evolutions: entity.evolutions?.map((e) => ({
        id: e.id.toString().padStart(3, '0'),
        name: e.name,
      })),
      previousEvolutions: entity['Previous evolution(s)']?.map((e) => ({
        id: e.id.toString().padStart(3, '0'),
        name: e.name,
      })),
      maxCP: entity.maxCP,
      maxHP: entity.maxHP,
      attacks: entity.attacks,
    };
  }

  async findPokemons(page: number, size: number): Promise<Pokemon[]> {
    return Promise.resolve([]);
  }
}
