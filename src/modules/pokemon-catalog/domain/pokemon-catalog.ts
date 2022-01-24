import { ForQueryingPokemons } from './for-querying-pokemons';
import { Pokemon } from './models';
import { MockedPokemons } from '../../../utils/tests/pokemons';

export class PokemonCatalog implements ForQueryingPokemons {
  getPokemonByItsID(id: string): Pokemon {
    return MockedPokemons.pikachu();
  }
}
