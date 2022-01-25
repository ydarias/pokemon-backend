import { getConnection } from 'typeorm';
import {
  AttackEntity,
  EvolutionEntity,
  EvolutionRequirementsEntity,
  MeasurementEntity,
  PokemonEntity,
  TypeEntity,
} from '../src/modules/pokemon-catalog/infra/pokemon.entity';

import * as pokemons from './pokemons.json';

export const testDatasetSeed = async () => {
  const connection = await getConnection();
  const entityManager = connection.createEntityManager();

  for (let i = 0; i < pokemons.length; i++) {
    const p = pokemons[i];

    const typeEntities: TypeEntity[] = [];
    for (let j = 0; j < p.types.length; j++) {
      const t = p.types[j];

      const type = new TypeEntity();
      type.name = t;
      typeEntities.push(await entityManager.save(type));
    }

    const resistantEntities: TypeEntity[] = [];
    for (let j = 0; j < p.resistant.length; j++) {
      const t = p.resistant[j];

      const type = new TypeEntity();
      type.name = t;
      resistantEntities.push(await entityManager.save(type));
    }

    const weaknessesEntities: TypeEntity[] = [];
    for (let j = 0; j < p.weaknesses.length; j++) {
      const t = p.weaknesses[j];

      const type = new TypeEntity();
      type.name = t;
      weaknessesEntities.push(await entityManager.save(type));
    }

    const fastAttackEntities: AttackEntity[] = [];
    for (let j = 0; j < p.attacks.fast.length; j++) {
      const a = p.attacks.fast[j];

      const attackEntity = new AttackEntity();
      attackEntity.type = a.type;
      attackEntity.name = a.name;
      attackEntity.damage = a.damage;
      fastAttackEntities.push(await entityManager.save(attackEntity));
    }

    const specialAttackEntities: AttackEntity[] = [];
    for (let j = 0; j < p.attacks.special.length; j++) {
      const a = p.attacks.special[j];

      const attackEntity = new AttackEntity();
      attackEntity.type = a.type;
      attackEntity.name = a.name;
      attackEntity.damage = a.damage;
      specialAttackEntities.push(await entityManager.save(attackEntity));
    }

    const evolutionsEntities: EvolutionEntity[] = [];
    for (let j = 0; p.evolutions && j < p.evolutions.length; j++) {
      const e = p.evolutions[j];

      const evolutionEntity = new EvolutionEntity();
      evolutionEntity.id = e.id.toString().padStart(3, '0');
      evolutionEntity.name = e.name;
      evolutionsEntities.push(await entityManager.save(evolutionEntity));
    }

    const previousEvolutionsEntities: EvolutionEntity[] = [];
    for (
      let j = 0;
      p['Previous evolution(s)'] && j < p['Previous evolution(s)'].length;
      j++
    ) {
      const e = p['Previous evolution(s)'][j];

      const evolutionEntity = new EvolutionEntity();
      evolutionEntity.id = e.id.toString().padStart(3, '0');
      evolutionEntity.name = e.name;
      previousEvolutionsEntities.push(
        await entityManager.save(evolutionEntity),
      );
    }

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

    const weightEntity = new MeasurementEntity();
    weightEntity.maximum = Number.parseFloat(
      p.weight.maximum.replace('kg', ''),
    );
    weightEntity.minimum = Number.parseFloat(
      p.weight.minimum.replace('kg', ''),
    );
    weightEntity.unit = 'kg';
    pokemonEntity.weight = await entityManager.save(weightEntity);

    const heightEntity = new MeasurementEntity();
    heightEntity.maximum = Number.parseFloat(p.height.maximum.replace('m', ''));
    heightEntity.minimum = Number.parseFloat(p.height.minimum.replace('m', ''));
    heightEntity.unit = 'm';
    pokemonEntity.height = await entityManager.save(heightEntity);

    if (p.evolutionRequirements) {
      const evolutionRequirementsEntity = new EvolutionRequirementsEntity();
      evolutionRequirementsEntity.name = p.evolutionRequirements.name;
      evolutionRequirementsEntity.amount = p.evolutionRequirements.amount;
      pokemonEntity.evolutionRequirements = await entityManager.save(
        evolutionRequirementsEntity,
      );
    }

    await entityManager.save(pokemonEntity);
  }
};
