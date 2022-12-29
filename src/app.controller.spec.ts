import { AppController } from './app.controller';
import { mock, mockReset } from 'jest-mock-extended';
import { ForQueryingPokemons } from './modules/pokemon-catalog/domain/for-querying-pokemons';
import { ForManagingUserPreferences } from './modules/user-pokedex/domain/for-managing-user-preferences';
import { MockedPokemons } from './utils/tests/pokemons';

describe('The APP controller', () => {
  const pokemonCatalog = mock<ForQueryingPokemons>();
  const userPokedex = mock<ForManagingUserPreferences>();
  const controller = new AppController(pokemonCatalog, userPokedex);

  beforeEach(() => {
    mockReset(pokemonCatalog);
    mockReset(userPokedex);
  });

  it('should use catalog to get a pokemon by its identifier', async () => {
    const pokemon = MockedPokemons.venusaur();
    pokemonCatalog.getPokemonByItsID.calledWith(pokemon.id).mockResolvedValue(pokemon);

    const result = await controller.getPokemonById(pokemon.id);

    expect(result.name).toStrictEqual(pokemon.name);
  });
});
