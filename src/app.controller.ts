import { Body, Controller, DefaultValuePipe, Get, Inject, Param, ParseIntPipe, Put, Query } from '@nestjs/common';
import { CollectionOf, PokemonFavoritesUpdateRequest, PokemonResponse, UserPreferencesResponse } from './models';
import { ForQueryingPokemons } from './modules/pokemon-catalog/domain/for-querying-pokemons';
import { Pokemon } from './modules/pokemon-catalog/domain/models';
import { ForManagingUserPreferences } from './modules/user-pokedex/domain/for-managing-user-preferences';

@Controller()
export class AppController {
  constructor(
    @Inject('PokemonCatalog')
    private readonly pokemonCatalog: ForQueryingPokemons,
    @Inject('UserPokedex')
    private readonly userPokedex: ForManagingUserPreferences,
  ) {}

  @Get('pokemons')
  async getPokemonPage(
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('type') type?: string,
    @Query('favorites') favorites?: boolean,
  ): Promise<CollectionOf<PokemonResponse>> {
    const filter: PokemonsQueryFilter = {
      type,
    };

    if (favorites) {
      // TODO it is hardcoded because we have no authentication/authorization yet
      const userID = 'default-user';
      const userPreferences = await this.userPokedex.getPreferences(userID);
      filter.allowedIDs = userPreferences.favoritePokemons;
    }

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

  @Get('pokemons/literals/types')
  async getPokemonTypes(): Promise<string[]> {
    return this.pokemonCatalog.getTypesOfPokemons();
  }

  @Get('me')
  async getUserPreferences(): Promise<UserPreferencesResponse> {
    // TODO it is hardcoded because we have no authentication/authorization yet
    const userID = 'default-user';

    return this.userPokedex.getPreferences(userID);
  }

  @Put('me/favorites')
  async updateUserFavoritePokemons(
    @Body() updateRequest: PokemonFavoritesUpdateRequest,
  ): Promise<UserPreferencesResponse> {
    // TODO it is hardcoded because we have no authentication/authorization yet
    const userID = 'default-user';

    // TODO This is the not efficient way ... maybe the hexagon should support multiple favorites update
    for (let i = 0; i < updateRequest.add?.length; i++) {
      await this.userPokedex.markFavoritePokemon(userID, updateRequest.add[i]);
    }
    for (let i = 0; i < updateRequest.remove?.length; i++) {
      await this.userPokedex.unmarkFavoritePokemon(userID, updateRequest.remove[i]);
    }

    return this.userPokedex.getPreferences(userID);
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
