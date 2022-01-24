import { ForQueryingPokemons } from './for-querying-pokemons';
import { PokemonCatalog } from './pokemon-catalog';
import { MockedPokemons } from '../../../utils/tests/pokemons';

describe('A Pokemon Catalog', () => {
  it('Gets a pokemon given its ID', () => {
    const pokemonCatalog: ForQueryingPokemons = new PokemonCatalog();
    expect(pokemonCatalog.getPokemonByItsID('025')).toStrictEqual(
      MockedPokemons.pikachu(),
    );
  });
});
