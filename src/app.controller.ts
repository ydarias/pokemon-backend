import { Controller, DefaultValuePipe, Get, Inject, Param, ParseIntPipe, Query } from '@nestjs/common';
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
  async getPokemonPage(
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('type') type?: string,
  ): Promise<CollectionOf<PokemonResponse>> {
    const filter = {
      type,
    };

    const items = (await this.pokemonCatalog.getPageOfPokemons(limit, skip, filter)).map((p) =>
      this.toPokemonResponse(p),
    );
    const count = await this.pokemonCatalog.getNumberOfPokemons(filter);
    return {
      items,
      meta: {
        limit,
        skip,
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
