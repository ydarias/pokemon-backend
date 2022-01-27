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

async function persistTypesInCollection(types: string[], entityManager: EntityManager): Promise<TypeEntity[]> {
  const entities: TypeEntity[] = [];
  for (let i = 0; i < types.length; i++) {
    const type = new TypeEntity();
    type.name = types[i];

    entities.push(await entityManager.save(type));
  }
  return entities;
}

async function persistAttacksInCollection(attacks: any, entityManager: EntityManager): Promise<AttackEntity[]> {
  const entities: AttackEntity[] = [];
  for (let i = 0; i < attacks.length; i++) {
    const attack = new AttackEntity();
    attack.type = attacks[i].type;
    attack.name = attacks[i].name;
    attack.damage = attacks[i].damage;

    entities.push(await entityManager.save(attack));
  }
  return entities;
}

async function persistEvolutionsInCollection(
  evolutions: any,
  entityManager: EntityManager,
): Promise<EvolutionEntity[]> {
  if (evolutions) {
    const entities: EvolutionEntity[] = [];
    for (let i = 0; i < evolutions.length; i++) {
      const evolution = new EvolutionEntity();
      evolution.id = evolutions[i].id.toString().padStart(3, '0');
      evolution.name = evolutions[i].name;

      entities.push(await entityManager.save(evolution));
    }
    return entities;
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

    await persistTypesInCollection(p.types, entityManager);

    const pokemonEntity = new PokemonEntity();
    pokemonEntity.id = p.id;
    pokemonEntity.name = p.name;
    pokemonEntity.nameForSearch = p.name.toLowerCase();
    pokemonEntity.classification = p.classification;
    pokemonEntity.types = p.types;
    pokemonEntity.resistant = p.resistant;
    pokemonEntity.weaknesses = p.weaknesses;
    pokemonEntity.fleeRate = p.fleeRate;
    pokemonEntity.maxCP = p.maxCP;
    pokemonEntity.maxHP = p.maxHP;
    pokemonEntity.fastAttacks = await persistAttacksInCollection(p.attacks.fast, entityManager);
    pokemonEntity.specialAttacks = await persistAttacksInCollection(p.attacks.special, entityManager);
    pokemonEntity.evolutions = await persistEvolutionsInCollection(p.evolutions, entityManager);
    pokemonEntity.previousEvolutions = await persistEvolutionsInCollection(p['Previous evolution(s)'], entityManager);
    pokemonEntity.weight = await entityManager.save(parseWeightEntity(p));
    pokemonEntity.height = await entityManager.save(parseHeightEntity(p));

    if (p.evolutionRequirements) {
      pokemonEntity.evolutionRequirements = await entityManager.save(parseEvolutionRequirementsEntity(p));
    }

    await entityManager.save(pokemonEntity);
  }
};
