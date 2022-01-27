import { getConnection } from 'typeorm';
import { UserPreferencesEntity } from '../src/modules/user-pokedex/infra/user-preferences.entity';

export const loadUserPreferences = async () => {
  const connection = await getConnection();
  const entityManager = connection.createEntityManager();

  await entityManager.delete(UserPreferencesEntity, {});

  const userPreferencesEntity = new UserPreferencesEntity();
  userPreferencesEntity.userID = 'default-user';
  userPreferencesEntity.favoritePokemons = ['034', '035'];

  await entityManager.save(userPreferencesEntity);
};
