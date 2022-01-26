import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { CollectionOf, PokemonResponse } from './models';
import { ForQueryingPokemons } from './modules/pokemon-catalog/domain/for-querying-pokemons';
import { Pokemon } from './modules/pokemon-catalog/domain/models';

@Controller()
export class AppController {
  constructor(
    @Inject('PokemonCatalog')
    private readonly pokemonCatalog: ForQueryingPokemons,
  ) {}

  @Get('pokemons')
  async getPokemonPage(@Query('limit') limit = 5, @Query('skip') skip = 0): Promise<CollectionOf<PokemonResponse>> {
    const items = (await this.pokemonCatalog.getPageOfPokemons(limit, skip)).map((p) => this.toPokemonResponse(p));
    const count = await this.pokemonCatalog.getNumberOfPokemons();
    return {
      items,
      meta: {
        // WTF: without the parsing it return a string as the JSON value
        limit: Number.parseInt(`${limit}`),
        skip: Number.parseInt(`${skip}`),
        count,
      },
    };
  }

  @Get('pokemons/:id')
  async getPokemonById(@Param('id') id: string): Promise<PokemonResponse> {
    return this.toPokemonResponse(await this.pokemonCatalog.getPokemonByItsID(id));
  }

  @Get('pokemons/name/:name')
  async getPokemonByName(@Param('name') name: string): Promise<PokemonResponse> {
    return this.toPokemonResponse(await this.pokemonCatalog.getPokemonByItsName(name));
  }

  private toPokemonResponse(pokemon: Pokemon): PokemonResponse {
    const response: PokemonResponse = {
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
      maxCP: pokemon.maxCP,
      maxHP: pokemon.maxHP,
      attacks: pokemon.attacks,
    };

    if (pokemon.previousEvolutions?.length > 0) {
      response['Previous evolution(s)'] = pokemon.previousEvolutions;
    }

    if (pokemon.evolutions?.length > 0) {
      response.evolutions = pokemon.evolutions;
    }

    if (pokemon.evolutionRequirements) {
      response.evolutionRequirements = pokemon.evolutionRequirements;
    }

    return response;
  }
}
