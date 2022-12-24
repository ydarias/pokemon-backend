import { DataSource } from 'typeorm';
import { UserPreferencesEntity } from '../src/modules/user-pokedex/infra/user-preferences.entity';

export const loadUserPreferences = async (datasource: DataSource) => {
  const entityManager = datasource.manager;

  await entityManager.delete(UserPreferencesEntity, {});

  const userPreferencesEntity = new UserPreferencesEntity();
  userPreferencesEntity.userID = 'default-user';
  userPreferencesEntity.favoritePokemons = ['034', '035', '037', '038'];

  await entityManager.save(userPreferencesEntity);
};
