import { mock } from 'jest-mock-extended';

import { ForQueryingPokemons } from './for-querying-pokemons';
import { PokemonCatalog } from './pokemon-catalog';
import { MockedPokemons } from '../../../utils/tests/pokemons';
import { ForGettingPokemons } from './for-getting-pokemons';

describe('A Pokemon Catalog', () => {
  const raichu = MockedPokemons.raichu();
  const venusaur = MockedPokemons.venusaur();

  it('Gets a pokemon given its ID using a port mocked adapter', async () => {
    const mockedPokemonsRepository = mock<ForGettingPokemons>();
    const pokemonCatalog: ForQueryingPokemons = new PokemonCatalog(mockedPokemonsRepository);

    mockedPokemonsRepository.getPokemonById.calledWith('026').mockResolvedValue(raichu);

    expect(await pokemonCatalog.getPokemonByItsID('026')).toStrictEqual(raichu);
  });

  it('Gets a pokemon given its name using a port mocked adapter', async () => {
    const mockedPokemonsRepository = mock<ForGettingPokemons>();
    const pokemonCatalog: ForQueryingPokemons = new PokemonCatalog(mockedPokemonsRepository);

    mockedPokemonsRepository.getPokemonByName.calledWith('venusaur').mockResolvedValue(venusaur);

    expect(await pokemonCatalog.getPokemonByItsName('venusaur')).toStrictEqual(venusaur);
  });

  it('Gets a page of pokemons using a port mocked adapter', async () => {
    const mockedPokemonsRepository = mock<ForGettingPokemons>();
    const pokemonCatalog: ForQueryingPokemons = new PokemonCatalog(mockedPokemonsRepository);

    mockedPokemonsRepository.findPokemons.calledWith(1, 2).mockResolvedValue([raichu, venusaur]);

    expect(await pokemonCatalog.getPageOfPokemons(1, 2)).toStrictEqual([raichu, venusaur]);
  });

  it('Gets the total amount of elements in a query', async () => {
    const mockedPokemonsRepository = mock<ForGettingPokemons>();
    const pokemonCatalog: ForQueryingPokemons = new PokemonCatalog(mockedPokemonsRepository);

    mockedPokemonsRepository.countPokemons.calledWith().mockResolvedValue(4);

    expect(await pokemonCatalog.getNumberOfPokemons()).toBe(4);
  });
});
