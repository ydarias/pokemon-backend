import { mock } from 'jest-mock-extended';

import { ForQueryingPokemons } from './for-querying-pokemons';
import { PokemonCatalog } from './pokemon-catalog';
import { MockedPokemons } from '../../../utils/tests/pokemons';
import { ForGettingPokemons } from './for-getting-pokemons';

describe('A Pokemon Catalog', () => {
  const raichu = MockedPokemons.raichu();
  const venusaur = MockedPokemons.venusaur();

  const mockedPokemonsRepository = mock<ForGettingPokemons>();
  const pokemonCatalog: ForQueryingPokemons = new PokemonCatalog(mockedPokemonsRepository);

  it('Gets a pokemon given its ID using a port mocked adapter', async () => {
    mockedPokemonsRepository.getPokemonById.calledWith('026').mockResolvedValue(raichu);

    expect(await pokemonCatalog.getPokemonByItsID('026')).toStrictEqual(raichu);
  });

  it('Gets a pokemon given its name using a port mocked adapter', async () => {
    mockedPokemonsRepository.getPokemonByName.calledWith('venusaur').mockResolvedValue(venusaur);

    expect(await pokemonCatalog.getPokemonByItsName('venusaur')).toStrictEqual(venusaur);
  });

  it('Gets a page of pokemons using a port mocked adapter', async () => {
    mockedPokemonsRepository.findPokemons.calledWith(1, 2).mockResolvedValue([raichu, venusaur]);

    expect(await pokemonCatalog.getPageOfPokemons(1, 2)).toStrictEqual([raichu, venusaur]);
  });

  it('Gets the total amount of elements in a query using a port mocked adapter', async () => {
    mockedPokemonsRepository.countPokemons.calledWith().mockResolvedValue(4);

    expect(await pokemonCatalog.getNumberOfPokemons()).toBe(4);
  });

  it('Gets a page of pokemons filtered by type using a port mocked adapter', async () => {
    const filter: PokemonsQueryFilter = {
      type: 'aType',
    };

    mockedPokemonsRepository.findPokemons.calledWith(1, 1, filter).mockResolvedValue([raichu]);

    expect(await pokemonCatalog.getPageOfPokemons(1, 1, filter)).toStrictEqual([raichu]);
  });

  it('Gets the total amount of elements in a filtered query using a port mocked adapter', async () => {
    const filter: PokemonsQueryFilter = {
      type: 'aType',
    };

    mockedPokemonsRepository.countPokemons.calledWith(filter).mockResolvedValue(4);

    expect(await pokemonCatalog.getNumberOfPokemons(filter)).toBe(4);
  });

  // This test is pretty silly because it is already green, it just serves to purpose
  // to change the PokemonsQueryFilter
  it('Gets a page of pokemons limited by a given IDs array using a port mocked adapter', async () => {
    const filter: PokemonsQueryFilter = {
      allowedIDs: ['003', '026'],
    };

    mockedPokemonsRepository.findPokemons.calledWith(1, 1, filter).mockResolvedValue([venusaur, raichu]);

    expect(await pokemonCatalog.getPageOfPokemons(1, 1, filter)).toStrictEqual([venusaur, raichu]);
  });

  it('Gets a list with the types of pokemons using a port mocked adapter', async () => {
    mockedPokemonsRepository.findTypes.mockResolvedValue(['Fire', 'Water', 'Electric']);

    expect(await pokemonCatalog.getTypesOfPokemons()).toStrictEqual(['Fire', 'Water', 'Electric']);
  });
});
