import { Controller, Get, Inject, Param } from '@nestjs/common';
import { PokemonResponse } from './models';
import { ForQueryingPokemons } from './modules/pokemon-catalog/domain/for-querying-pokemons';
import { Pokemon } from './modules/pokemon-catalog/domain/models';

@Controller()
export class AppController {
  constructor(
    @Inject('PokemonCatalog')
    private readonly pokemonCatalog: ForQueryingPokemons,
  ) {}

  @Get('pokemons/:id')
  getPokemonByID(@Param('id') id: string): PokemonResponse {
    return this.toPokemonResponse(this.pokemonCatalog.getPokemonByItsID(id));
  }

  private toPokemonResponse(pokemon: Pokemon): PokemonResponse {
    return {
      id: pokemon.id,
      name: pokemon.name,
      classification: pokemon.classification,
      types: pokemon.types,
      resistant: pokemon.resistant,
      weaknesses: pokemon.weaknesses,
      weight: {
        minimum: `${pokemon.weight.minimum}${pokemon.weight.unit}`,
        maximum: `${pokemon.weight.maximum}${pokemon.weight.unit}`,
      },
      height: {
        minimum: `${pokemon.height.minimum}${pokemon.height.unit}`,
        maximum: `${pokemon.height.maximum}${pokemon.height.unit}`,
      },
      fleeRate: pokemon.fleeRate,
      evolutionRequirements: pokemon.evolutionRequirements,
      evolutions: pokemon.evolutions,
      previousEvolutions: pokemon.previousEvolutions,
      maxCP: pokemon.maxCP,
      maxHP: pokemon.maxHP,
      attacks: pokemon.attacks,
    };
  }
}
