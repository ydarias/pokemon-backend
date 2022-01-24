import { mock } from 'jest-mock-extended';

import { ForQueryingPokemons } from './for-querying-pokemons';
import { PokemonCatalog } from './pokemon-catalog';
import { MockedPokemons } from '../../../utils/tests/pokemons';
import { ForGettingPokemons } from './for-getting-pokemons';

describe('A Pokemon Catalog', () => {
  const raichu = MockedPokemons.raichu();

  it('Gets a pokemon given its ID using a port mocked adapter', () => {
    const mockedPokemonsRepository = mock<ForGettingPokemons>();
    const pokemonCatalog: ForQueryingPokemons = new PokemonCatalog(
      mockedPokemonsRepository,
    );

    mockedPokemonsRepository.getPokemonById
      .calledWith('026')
      .mockReturnValue(raichu);

    expect(pokemonCatalog.getPokemonByItsID('026')).toStrictEqual(raichu);
  });
});
