import { EntityManager, getConnection } from 'typeorm';
import {
  AttackEntity,
  EvolutionEntity,
  EvolutionRequirementsEntity,
  MeasurementEntity,
  PokemonEntity,
  TypeEntity,
} from '../src/modules/pokemon-catalog/infra/pokemon.entity';

import * as pokemons from './pokemons.json';

async function persistTypesInCollection(types: any, entityManager: EntityManager): Promise<TypeEntity[]> {
  return Promise.all(
    types.map(async (t) => {
      const type = new TypeEntity();
      type.name = t;

      return await entityManager.save(type);
    }),
  );
}

async function persistAttacksInCollection(attacks: any, entityManager: EntityManager): Promise<AttackEntity[]> {
  return Promise.all(
    attacks.map(async (a) => {
      const attack = new AttackEntity();
      attack.type = a.type;
      attack.name = a.name;
      attack.damage = a.damage;

      return await entityManager.save(attack);
    }),
  );
}

async function persistEvolutionsInCollection(
  evolutions: any,
  entityManager: EntityManager,
): Promise<EvolutionEntity[]> {
  if (evolutions) {
    return Promise.all(
      evolutions.map(async (e) => {
        const evolution = new EvolutionEntity();
        evolution.id = e.id.toString().padStart(3, '0');
        evolution.name = e.name;

        return await entityManager.save(evolution);
      }),
    );
  }

  return [];
}

function parseWeightEntity(p) {
  const weightEntity = new MeasurementEntity();
  weightEntity.maximum = Number.parseFloat(p.weight.maximum.replace('kg', ''));
  weightEntity.minimum = Number.parseFloat(p.weight.minimum.replace('kg', ''));
  weightEntity.unit = 'kg';

  return weightEntity;
}

function parseHeightEntity(p) {
  const heightEntity = new MeasurementEntity();
  heightEntity.maximum = Number.parseFloat(p.height.maximum.replace('m', ''));
  heightEntity.minimum = Number.parseFloat(p.height.minimum.replace('m', ''));
  heightEntity.unit = 'm';

  return heightEntity;
}

function parseEvolutionRequirementsEntity(p) {
  const evolutionRequirementsEntity = new EvolutionRequirementsEntity();
  evolutionRequirementsEntity.name = p.evolutionRequirements.name;
  evolutionRequirementsEntity.amount = p.evolutionRequirements.amount;

  return evolutionRequirementsEntity;
}

export const testDatasetSeed = async () => {
  const connection = await getConnection();
  const entityManager = connection.createEntityManager();

  for (let i = 0; i < pokemons.length; i++) {
    const p = pokemons[i];

    const [
      typeEntities,
      resistantEntities,
      weaknessesEntities,
      fastAttackEntities,
      specialAttackEntities,
      evolutionsEntities,
      previousEvolutionsEntities,
    ] = await Promise.all([
      persistTypesInCollection(p.types, entityManager),
      persistTypesInCollection(p.resistant, entityManager),
      persistTypesInCollection(p.weaknesses, entityManager),
      persistAttacksInCollection(p.attacks.fast, entityManager),
      persistAttacksInCollection(p.attacks.special, entityManager),
      persistEvolutionsInCollection(p.evolutions, entityManager),
      persistEvolutionsInCollection(p['Previous evolution(s)'], entityManager),
    ]);

    const pokemonEntity = new PokemonEntity();
    pokemonEntity.id = p.id;
    pokemonEntity.name = p.name;
    pokemonEntity.nameForSearch = p.name.toLowerCase();
    pokemonEntity.classification = p.classification;
    pokemonEntity.types = typeEntities;
    pokemonEntity.resistant = resistantEntities;
    pokemonEntity.weaknesses = weaknessesEntities;
    pokemonEntity.fleeRate = p.fleeRate;
    pokemonEntity.maxCP = p.maxCP;
    pokemonEntity.maxHP = p.maxHP;
    pokemonEntity.fastAttacks = fastAttackEntities;
    pokemonEntity.specialAttacks = specialAttackEntities;
    pokemonEntity.evolutions = evolutionsEntities;
    pokemonEntity.previousEvolutions = previousEvolutionsEntities;
    pokemonEntity.weight = await entityManager.save(parseWeightEntity(p));
    pokemonEntity.height = await entityManager.save(parseHeightEntity(p));

    if (p.evolutionRequirements) {
      pokemonEntity.evolutionRequirements = await entityManager.save(parseEvolutionRequirementsEntity(p));
    }

    await entityManager.save(pokemonEntity);
  }
};
