import { Pokemon } from '../../modules/pokemon-catalog/domain/models';
import { PokemonResponse } from '../../models';

export class MockedPokemons {
  static pikachuView(): PokemonResponse {
    return {
      id: '025',
      name: 'Pikachu',
      classification: 'Mouse Pokémon',
      types: ['Electric'],
      resistant: ['Electric', 'Flying', 'Steel'],
      weaknesses: ['Ground'],
      weight: {
        minimum: '5.25kg',
        maximum: '6.75kg',
      },
      height: {
        minimum: '0.35m',
        maximum: '0.45m',
      },
      fleeRate: 0.1,
      evolutionRequirements: {
        amount: 50,
        name: 'Pikachu candies',
      },
      evolutions: [
        {
          id: '026',
          name: 'Raichu',
        },
      ],
      maxCP: 777,
      maxHP: 887,
      attacks: {
        fast: [
          {
            name: 'Quick Attack',
            type: 'Normal',
            damage: 10,
          },
          {
            name: 'Thunder Shock',
            type: 'Electric',
            damage: 5,
          },
        ],
        special: [
          {
            name: 'Discharge',
            type: 'Electric',
            damage: 35,
          },
          {
            name: 'Thunder',
            type: 'Electric',
            damage: 100,
          },
          {
            name: 'Thunderbolt',
            type: 'Electric',
            damage: 55,
          },
        ],
      },
    };
  }

  static raichu(): Pokemon {
    return {
      id: '026',
      name: 'Raichu',
      classification: 'Mouse Pokémon',
      types: ['Electric'],
      resistant: ['Electric', 'Flying', 'Steel'],
      weaknesses: ['Ground'],
      weight: {
        minimum: 26.25,
        maximum: 33.75,
        unit: 'kg',
      },
      height: {
        minimum: 0.7,
        maximum: 0.9,
        unit: 'm',
      },
      fleeRate: 0.06,
      previousEvolutions: [
        {
          id: '025',
          name: 'Pikachu',
        },
      ],
      maxCP: 1859,
      maxHP: 2028,
      attacks: {
        fast: [
          {
            name: 'Spark',
            type: 'Electric',
            damage: 7,
          },
          {
            name: 'Thunder Shock',
            type: 'Electric',
            damage: 5,
          },
        ],
        special: [
          {
            name: 'Brick Break',
            type: 'Fighting',
            damage: 30,
          },
          {
            name: 'Thunder',
            type: 'Electric',
            damage: 100,
          },
          {
            name: 'Thunder Punch',
            type: 'Electric',
            damage: 40,
          },
        ],
      },
    };
  }

  static venusaur(): Pokemon {
    return {
      id: '003',
      name: 'Venusaur',
      classification: 'Seed Pokémon',
      types: ['Grass', 'Poison'],
      resistant: ['Water', 'Electric', 'Grass', 'Fighting', 'Fairy'],
      weaknesses: ['Fire', 'Ice', 'Flying', 'Psychic'],
      weight: {
        minimum: 87.5,
        maximum: 112.5,
        unit: 'kg',
      },
      height: {
        minimum: 1.75,
        maximum: 2.25,
        unit: 'm,',
      },
      fleeRate: 0.05,
      previousEvolutions: [
        {
          id: '001',
          name: 'Bulbasaur',
        },
        {
          id: '002',
          name: 'Ivysaur',
        },
      ],
      maxCP: 2392,
      maxHP: 2580,
      attacks: {
        fast: [
          {
            name: 'Razor Leaf',
            type: 'Grass',
            damage: 15,
          },
          {
            name: 'Vine Whip',
            type: 'Grass',
            damage: 7,
          },
        ],
        special: [
          {
            name: 'Petal Blizzard',
            type: 'Grass',
            damage: 65,
          },
          {
            name: 'Sludge Bomb',
            type: 'Poison',
            damage: 55,
          },
          {
            name: 'Solar Beam',
            type: 'Grass',
            damage: 120,
          },
        ],
      },
    };
  }
}
