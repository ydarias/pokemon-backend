import { ForGettingPokemons } from '../domain/for-getting-pokemons';
import { Pokemon } from '../domain/models';
import { In, Repository } from 'typeorm';
import { PokemonEntity, TypeEntity } from './pokemon.entity';

export class DbPokemonRepository implements ForGettingPokemons {
  constructor(private readonly pokemonRepository: Repository<PokemonEntity>) {}

  async getPokemonById(id: string): Promise<Pokemon> {
    return this.toPokemon(await this.pokemonRepository.findOne({ where: { id } }));
  }

  async getPokemonByName(name: string): Promise<Pokemon> {
    return this.toPokemon(await this.pokemonRepository.findOne({ where: { nameForSearch: name } }));
  }

  async findPokemons(limit: number, skip: number, filter?: PokemonsQueryFilter): Promise<Pokemon[]> {
    const where = {};
    if (filter?.type) {
      where['types'] = [filter?.type];
    }
    if (filter?.allowedIDs) {
      where['id'] = In(filter.allowedIDs);
    }

    return (await this.pokemonRepository.find({ where, order: { id: 'ASC' }, skip, take: limit })).map((e) =>
      this.toPokemon(e),
    );
  }

  async countPokemons(filter?: PokemonsQueryFilter): Promise<number> {
    const where = {};
    if (filter?.type) {
      where['types'] = [filter?.type];
    }
    if (filter?.allowedIDs) {
      where['id'] = In(filter.allowedIDs);
    }

    return this.pokemonRepository.count(where);
  }

  async findTypes(): Promise<string[]> {
    // Injecting this repository as a dependency could be cleaner
    const typeRepository = this.pokemonRepository.manager.getRepository<TypeEntity>(TypeEntity);
    return (await typeRepository.find({ order: { name: 'ASC' } })).map((t) => t.name);
  }

  private toPokemon(entity: PokemonEntity): Pokemon {
    const pokemon: Pokemon = {
      id: entity.id,
      name: entity.name,
      classification: entity.classification,
      types: entity.types,
      resistant: entity.resistant,
      weaknesses: entity.weaknesses,
      weight: {
        maximum: entity.weight.maximum,
        minimum: entity.weight.minimum,
        unit: entity.weight.unit,
      },
      height: {
        maximum: entity.height.maximum,
        minimum: entity.height.minimum,
        unit: entity.height.unit,
      },
      fleeRate: entity.fleeRate,
      maxCP: entity.maxCP,
      maxHP: entity.maxHP,
      attacks: {
        fast: entity.fastAttacks.map((a) => ({
          name: a.name,
          type: a.type,
          damage: a.damage,
        })),
        special: entity.specialAttacks.map((a) => ({
          name: a.name,
          type: a.type,
          damage: a.damage,
        })),
      },
    };

    if (entity.evolutions) {
      pokemon.evolutions = entity.evolutions?.map((e) => ({
        id: e.id,
        name: e.name,
      }));
    }

    if (entity.previousEvolutions) {
      pokemon.previousEvolutions = entity.previousEvolutions?.map((e) => ({
        id: e.id,
        name: e.name,
      }));
    }

    if (entity.evolutionRequirements) {
      pokemon.evolutionRequirements = {
        name: entity.evolutionRequirements.name,
        amount: entity.evolutionRequirements.amount,
      };
    }

    return pokemon;
  }
}
