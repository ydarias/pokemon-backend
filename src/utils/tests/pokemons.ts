import { Pokemon } from '../../modules/pokemon-catalog/domain/models';
import { PokemonResponse } from '../../models';

export class MockedPokemons {
  static pikachuResponse(): PokemonResponse {
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

  static charizardResponse(): PokemonResponse {
    return {
      id: '006',
      name: 'Charizard',
      classification: 'Flame Pokémon',
      types: ['Fire', 'Flying'],
      resistant: ['Fire', 'Grass', 'Fighting', 'Bug', 'Steel', 'Fairy'],
      weaknesses: ['Water', 'Electric', 'Rock'],
      weight: {
        minimum: '79.19kg',
        maximum: '101.81kg',
      },
      height: {
        minimum: '1.49m',
        maximum: '1.91m',
      },
      fleeRate: 0.05,
      'Previous evolution(s)': [
        {
          id: '004',
          name: 'Charmander',
        },
        {
          id: '005',
          name: 'Charmeleon',
        },
      ],
      maxCP: 2413,
      maxHP: 2602,
      attacks: {
        fast: [
          {
            name: 'Ember',
            type: 'Fire',
            damage: 10,
          },
          {
            name: 'Wing Attack',
            type: 'Flying',
            damage: 9,
          },
        ],
        special: [
          {
            name: 'Dragon Claw',
            type: 'Dragon',
            damage: 35,
          },
          {
            name: 'Fire Blast',
            type: 'Fire',
            damage: 100,
          },
          {
            name: 'Flamethrower',
            type: 'Fire',
            damage: 55,
          },
        ],
      },
    };
  }

  static charmanderResponse(): PokemonResponse {
    return {
      id: '004',
      name: 'Charmander',
      classification: 'Lizard Pokémon',
      types: ['Fire'],
      resistant: ['Fire', 'Grass', 'Ice', 'Bug', 'Steel', 'Fairy'],
      weaknesses: ['Water', 'Ground', 'Rock'],
      weight: {
        minimum: '7.44kg',
        maximum: '9.56kg',
      },
      height: {
        minimum: '0.53m',
        maximum: '0.68m',
      },
      fleeRate: 0.1,
      evolutionRequirements: {
        amount: 25,
        name: 'Charmander candies',
      },
      evolutions: [
        {
          id: '005',
          name: 'Charmeleon',
        },
        {
          id: '006',
          name: 'Charizard',
        },
      ],
      maxCP: 841,
      maxHP: 955,
      attacks: {
        fast: [
          {
            name: 'Ember',
            type: 'Fire',
            damage: 10,
          },
          {
            name: 'Scratch',
            type: 'Normal',
            damage: 6,
          },
        ],
        special: [
          {
            name: 'Flame Burst',
            type: 'Fire',
            damage: 30,
          },
          {
            name: 'Flame Charge',
            type: 'Fire',
            damage: 25,
          },
          {
            name: 'Flamethrower',
            type: 'Fire',
            damage: 55,
          },
        ],
      },
    };
  }

  static charmaleonResponse(): PokemonResponse {
    return {
      id: '005',
      name: 'Charmeleon',
      classification: 'Flame Pokémon',
      types: ['Fire'],
      resistant: ['Fire', 'Grass', 'Ice', 'Bug', 'Steel', 'Fairy'],
      weaknesses: ['Water', 'Ground', 'Rock'],
      weight: {
        minimum: '16.63kg',
        maximum: '21.38kg',
      },
      height: {
        minimum: '0.96m',
        maximum: '1.24m',
      },
      fleeRate: 0.07,
      'Previous evolution(s)': [
        {
          id: '004',
          name: 'Charmander',
        },
      ],
      evolutionRequirements: {
        amount: 100,
        name: 'Charmander candies',
      },
      evolutions: [
        {
          id: '006',
          name: 'Charizard',
        },
      ],
      maxCP: 1411,
      maxHP: 1557,
      attacks: {
        fast: [
          {
            name: 'Ember',
            type: 'Fire',
            damage: 10,
          },
          {
            name: 'Scratch',
            type: 'Normal',
            damage: 6,
          },
        ],
        special: [
          {
            name: 'Fire Punch',
            type: 'Fire',
            damage: 40,
          },
          {
            name: 'Flame Burst',
            type: 'Fire',
            damage: 30,
          },
          {
            name: 'Flamethrower',
            type: 'Fire',
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
