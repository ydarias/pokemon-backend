import { ForStoringAndGettingUserPreferences } from '../domain/for-storing-getting-user-preferences';
import { UserPreferences } from '../domain/user-preferences.model';
import { Repository } from 'typeorm';
import { UserPreferencesEntity } from './user-preferences.entity';

export class DbUserPreferencesRepository implements ForStoringAndGettingUserPreferences {
  constructor(private readonly userPreferencesRepository: Repository<UserPreferencesEntity>) {}

  findUserPreferences(userID: string): Promise<UserPreferences> {
    return this.userPreferencesRepository.findOne({ where: { userID } });
  }

  updateUserPreferences(preferences: UserPreferences): Promise<UserPreferences> {
    return this.userPreferencesRepository.save(preferences);
  }
}
