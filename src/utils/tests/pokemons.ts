import { Pokemon } from '../../modules/pokemon-catalog/domain/models';

export class MockedPokemons {
  static pikachu(): Pokemon {
    return {
      id: '025',
      name: 'Pikachu',
      classification: 'Mouse Pokémon',
      types: ['Electric'],
      resistant: ['Electric', 'Flying', 'Steel'],
      weaknesses: ['Ground'],
      weight: {
        minimum: 5.25,
        maximum: 6.75,
        unit: 'kg',
      },
      height: {
        minimum: 0.35,
        maximum: 0.45,
        unit: 'm',
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
}
